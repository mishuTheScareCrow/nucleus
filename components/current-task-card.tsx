"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Zap } from "lucide-react";
import { Task } from "@/app/dashboard/tasks/tasks-table";
import confetti from "canvas-confetti";
import { updateTaskStatus } from "@/app/actions/tasks";

export function CurrentTaskCard({ task }: { task: Task | null }) {
  if (!task) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <CheckCircle2 className="h-10 w-10 mb-4 opacity-20" />
          <p>No tasks scheduled. Add one to get started!</p>
        </CardContent>
      </Card>
    );
  }

  const handleComplete = async () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    await updateTaskStatus(task.id, "done");
  };

  return (
    <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-background to-primary/5">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Zap className="h-24 w-24 rotate-12" />
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
           <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
              Up Next
           </Badge>
           <div className="text-xs font-mono text-muted-foreground">
              Score: {task.priorityScore}
           </div>
        </div>
        <CardTitle className="text-2xl mt-2 leading-tight">{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
                {task.subject && (
                    <div className="text-sm text-muted-foreground">
                        Subject: <span className="font-medium text-foreground">{task.subject}</span>
                    </div>
                )}
                 {task.estimatedMinutes && (
                    <div className="text-sm text-muted-foreground">
                        Est. Time: <span className="font-medium text-foreground">{task.estimatedMinutes}m</span>
                    </div>
                )}
            </div>
            <Button onClick={handleComplete} size="lg" className="gap-2 shadow-md">
                <CheckCircle2 className="h-5 w-5" />
                Mark Done
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}

