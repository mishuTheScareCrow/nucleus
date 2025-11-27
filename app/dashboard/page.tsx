import { getTasks } from "@/app/actions/tasks";
import { PomodoroTimer } from "@/components/pomodoro-timer";
import { CurrentTaskCard } from "@/components/current-task-card";
import { SessionHistory } from "@/components/session-history";
import { getSettings } from "@/app/actions/settings";

export default async function Page() { 
  const tasks = await getTasks();
  const settings = await getSettings();

  // Filter for active tasks
  const activeTasks = tasks.filter((t) => t.status !== "done");
  
  // Smart Selection Logic:
  // Sort by Priority Score (High -> Low)
  const sortedTasks = activeTasks.sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0));
  const currentTask = sortedTasks[0] || null;

  // Get completed tasks for history
  const completedTasks = tasks.filter((t) => t.status === "done");

  return (
    <div className="grid gap-8 lg:grid-cols-2 h-full p-4 md:p-8">
      {/* Left Column: Timer */}
      <div className="flex flex-col justify-center space-y-8 lg:border-r lg:pr-8">
        <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Focus Session</h1>
            <p className="text-muted-foreground">Stay in the flow.</p>
        </div>
        <PomodoroTimer initialSettings={settings || undefined} />
      </div>

      {/* Right Column: Task & History */}
      <div className="flex flex-col space-y-8 justify-center max-w-md mx-auto w-full lg:mx-0">
         <div className="space-y-4">
            <h2 className="font-semibold text-lg">Current Priority</h2>
            <CurrentTaskCard task={currentTask} />
         </div>
         
         <SessionHistory completedTasks={completedTasks} />
      </div>
    </div>
  );
}
