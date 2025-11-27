"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Task } from "@/app/dashboard/tasks/tasks-table";
import { format } from "date-fns";
import { CheckCircle2 } from "lucide-react";

export function SessionHistory({ completedTasks }: { completedTasks: Task[] }) {
  const todayCompleted = completedTasks.filter(
    (t) =>
      t.status === "done" &&
      new Date().toDateString() === new Date(t.updatedAt).toDateString() // Assuming updatedAt is updated on completion
      // In a real app, you might want a separate completedAt field
  );

  return (
    <div className="space-y-4">
      <h3 className="font-semibold leading-none tracking-tight">Today&apos;s Wins</h3>
      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        {todayCompleted.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center py-8">
            No tasks completed yet today.
          </div>
        ) : (
          <div className="space-y-4">
            {todayCompleted.map((task) => (
              <div key={task.id} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                <div className="grid gap-1">
                  <p className="font-medium leading-none">{task.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {task.subject} • {task.estimatedMinutes}m
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

