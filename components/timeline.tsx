"use client";

import { Task } from "@/app/dashboard/tasks/tasks-table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { differenceInMinutes, addHours, format, startOfHour } from "date-fns";

interface TimelineProps {
  tasks: Task[];
  startTime?: number; // Hour (0-23) default 8
  endTime?: number;   // Hour (0-23) default 23
}

export function Timeline({ tasks, startTime = 8, endTime = 23 }: TimelineProps) {
  // Generate hours array for the header
  const hours = Array.from(
    { length: endTime - startTime + 1 },
    (_, i) => startTime + i
  );

  // Process tasks into timeline blocks
  // For this visualization, we assume tasks are sequenced one after another
  // starting from "now" or the start time, each taking their estimated minutes.
  // In a real scheduler, this would use actual scheduled start/end times.
  let currentOffsetMinutes = 0;
  const now = new Date();
  const currentHour = now.getHours();
  
  // Start timeline from next hour block if it's already past start time
  const timelineStartHour = Math.max(startTime, currentHour);
  const startBase = new Date();
  startBase.setHours(timelineStartHour, 0, 0, 0);

  const blocks = tasks.slice(0, 5).map((task) => {
    const duration = task.estimatedMinutes || 30; // default 30m
    const start = new Date(startBase.getTime() + currentOffsetMinutes * 60000);
    const end = new Date(start.getTime() + duration * 60000);
    
    currentOffsetMinutes += duration + 5; // Add 5 min buffer between tasks

    return {
      task,
      start,
      end,
      duration,
    };
  });

  const HOUR_WIDTH = 120; // px per hour

  return (
    <div className="w-full space-y-2">
      <h3 className="font-semibold text-sm text-muted-foreground px-1">
        Suggested Schedule
      </h3>
      <ScrollArea className="w-full rounded-md border bg-background/50 backdrop-blur-sm">
        <div className="relative min-w-[800px]">
          {/* Time Header */}
          <div className="flex border-b h-10 items-center bg-muted/20">
            {hours.map((hour) => (
              <div
                key={hour}
                className="flex-none border-r text-xs text-muted-foreground px-2"
                style={{ width: HOUR_WIDTH }}
              >
                {format(new Date().setHours(hour, 0), "h a")}
              </div>
            ))}
          </div>

          {/* Timeline Grid & Blocks */}
          <div className="relative h-32 bg-grid-slate-100 dark:bg-grid-slate-900/10">
            {/* Grid lines */}
            <div className="absolute inset-0 flex pointer-events-none">
               {hours.map((hour) => (
                <div
                  key={`grid-${hour}`}
                  className="flex-none border-r border-dashed border-muted h-full"
                  style={{ width: HOUR_WIDTH }}
                />
              ))}
            </div>

            {/* Current Time Indicator */}
            {currentHour >= startTime && currentHour <= endTime && (
               <div 
                 className="absolute top-0 bottom-0 w-px bg-red-500 z-20 pointer-events-none"
                 style={{
                    left: (currentHour - startTime + (now.getMinutes() / 60)) * HOUR_WIDTH
                 }}
               >
                  <div className="absolute -top-1 -left-1 h-2 w-2 rounded-full bg-red-500" />
               </div>
            )}

            {/* Task Blocks */}
            <div className="absolute top-4 left-0 right-0 h-20 px-px">
              {blocks.map((block, index) => {
                // Calculate position
                const startHour = block.start.getHours() + (block.start.getMinutes() / 60);
                const startOffset = startHour - startTime;
                
                if (startOffset < 0) return null; // Skip tasks before start time window

                const left = startOffset * HOUR_WIDTH;
                const width = (block.duration / 60) * HOUR_WIDTH;

                // Color coding based on subject or generic
                const colors = [
                  "bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-300",
                  "bg-purple-500/15 border-purple-500/30 text-purple-700 dark:text-purple-300",
                  "bg-orange-500/15 border-orange-500/30 text-orange-700 dark:text-orange-300",
                  "bg-green-500/15 border-green-500/30 text-green-700 dark:text-green-300",
                ];
                const colorClass = colors[index % colors.length];

                return (
                  <div
                    key={block.task.id}
                    className={cn(
                      "absolute top-0 bottom-0 rounded-lg border px-3 py-2 text-xs transition-all hover:brightness-95 cursor-pointer overflow-hidden group",
                      colorClass
                    )}
                    style={{
                      left: left,
                      width: width,
                    }}
                  >
                    <div className="font-medium truncate">{block.task.title}</div>
                    <div className="opacity-70 truncate text-[10px]">
                       {format(block.start, "h:mm")} - {format(block.end, "h:mm a")}
                    </div>
                    <div className="absolute bottom-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono">
                       {block.duration}m
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

