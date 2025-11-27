import { Task } from "@/app/dashboard/tasks/tasks-table";
import { differenceInHours, startOfDay, isToday } from "date-fns";

export interface TaskPriority extends Task {
  priorityScore: number;
  urgencyScore: number;
  effortScore: number;
}

/**
 * Calculates the "Next Best Task" based on a weighted scoring algorithm.
 * 
 * Scoring Factors:
 * 1. Urgency (Due Date): Exponentially increases as the deadline approaches.
 * 2. Effort (Estimated Minutes): Favors tasks that fit typical focus blocks (~25-60 mins), penalizes very long tasks without breakdown.
 * 3. User Energy (Optional): Can adjust weights based on user input (High/Med/Low).
 * 
 * @param tasks Array of all user tasks
 * @param userEnergyLevel Current energy level of the user (default: "high")
 * @returns Object containing the best task and a sorted list of tasks for the day
 */
export function getNextBestTask(
  tasks: Task[],
  userEnergyLevel: "high" | "medium" | "low" = "high"
): { bestTask: TaskPriority | null; sortedTasks: TaskPriority[] } {
  
  // Filter out completed tasks
  const activeTasks = tasks.filter((t) => t.status !== "done");

  if (activeTasks.length === 0) {
    return { bestTask: null, sortedTasks: [] };
  }

  const scoredTasks: TaskPriority[] = activeTasks.map((task) => {
    let urgencyScore = 0;
    let effortScore = 0;
    let priorityScore = 0;

    // --- 1. Urgency Calculation ---
    // Score increases significantly as the due date gets closer (within 24-48 hours)
    if (task.dueDate) {
      const hoursUntilDue = differenceInHours(new Date(task.dueDate), new Date());
      
      if (hoursUntilDue <= 0) {
        urgencyScore = 100; // Overdue or due now -> Max urgency
      } else if (hoursUntilDue <= 24) {
        urgencyScore = 90; // Due within 24 hours
      } else if (hoursUntilDue <= 48) {
        urgencyScore = 70; // Due within 2 days
      } else if (hoursUntilDue <= 168) {
        urgencyScore = 40; // Due within a week
      } else {
        urgencyScore = 10; // Due later
      }
    } else {
      // No due date tasks are treated as low urgency unless manually flagged
      urgencyScore = 5; 
    }

    // --- 2. Effort/Complexity Calculation ---
    // We want to recommend tasks that are "doable" right now.
    // Ideally, a task takes 30-60 mins. Too short = filler, Too long = daunting.
    const minutes = task.estimatedMinutes || 30; // Default to 30 mins if not set

    if (minutes <= 15) {
      effortScore = 40; // Quick wins
    } else if (minutes <= 60) {
      effortScore = 80; // Sweet spot for a Pomodoro session
    } else if (minutes <= 120) {
      effortScore = 50; // Requires deep work
    } else {
      effortScore = 20; // Too large, likely needs breaking down
    }

    // --- 3. Energy Level Adjustment ---
    // Adjust scores based on user's current energy.
    // Low Energy -> Favor easier, shorter tasks (Low Effort)
    // High Energy -> Tackle harder, urgent tasks
    let energyMultiplier = 1;
    
    if (userEnergyLevel === "low") {
        // Boost score if task is short (< 30 mins)
        if (minutes <= 30) energyMultiplier = 1.5;
        // Penalize long tasks
        if (minutes > 60) energyMultiplier = 0.5;
    } else if (userEnergyLevel === "high") {
        // Boost score for deep work tasks (45-90 mins)
        if (minutes >= 45 && minutes <= 90) energyMultiplier = 1.2;
    }

    // --- Final Score ---
    // Weights: Urgency (60%), Effort (40%) * Energy Multiplier
    priorityScore = (urgencyScore * 0.6) + ((effortScore * 0.4) * energyMultiplier);
    
    // Boost manually pinned/flagged priority from DB if exists
    if (task.priorityScore) {
        // Normalize DB score (assuming base 100) into the algo
        priorityScore += (task.priorityScore / 10); 
    }

    return {
      ...task,
      priorityScore: Math.round(priorityScore),
      urgencyScore,
      effortScore
    };
  });

  // Sort by priority score descending
  const sortedTasks = scoredTasks.sort((a, b) => b.priorityScore - a.priorityScore);

  return {
    bestTask: sortedTasks[0] || null,
    sortedTasks,
  };
}

/**
 * Helper to get tasks specifically relevant for "Today"
 * Includes:
 * 1. Tasks due today/tomorrow
 * 2. Tasks in progress
 * 3. Top priority tasks from the backlog
 */
export function getTodayTimeline(tasks: TaskPriority[]): TaskPriority[] {
    return tasks.filter(task => {
        if (!task.dueDate) return task.priorityScore > 70; // Show high priority backlog items
        return isToday(new Date(task.dueDate)) || differenceInHours(new Date(task.dueDate), new Date()) < 24;
    });
}

