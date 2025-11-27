import { getTasks } from "@/app/actions/tasks";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { WeeklyChart } from "@/components/weekly-chart";
import { Flame, Timer, Trophy, BookOpen } from "lucide-react";
import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

export default async function AnalyticsPage() {
  const tasks = await getTasks();
  const completedTasks = tasks.filter((t) => t.status === "done");

  // -- 1. Calculate Total Study Hours --
  const totalMinutes = completedTasks.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  // -- 2. Calculate Focus Streak --
  // Simple logic: consecutive days with at least one completed task looking back from today
  let streak = 0;
  const today = new Date();
  let checkDate = today;
  
  // Check up to 365 days back
  for (let i = 0; i < 365; i++) {
    const hasTask = completedTasks.some(t => 
        isSameDay(new Date(t.updatedAt), checkDate)
    );
    if (hasTask) {
        streak++;
        checkDate = subDays(checkDate, 1);
    } else {
        // If it's today and no task yet, don't break streak if yesterday had one
        if (isSameDay(checkDate, today)) {
             checkDate = subDays(checkDate, 1);
             continue;
        }
        break;
    }
  }

  // -- 3. Weekly Activity Data --
  const start = startOfWeek(new Date(), { weekStartsOn: 1 }); // Mon start
  const end = endOfWeek(new Date(), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  const weeklyData = days.map(day => {
    const dayTasks = completedTasks.filter(t => isSameDay(new Date(t.updatedAt), day));
    // Calculate "pomodoros" roughly as minutes / 25
    const mins = dayTasks.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);
    return {
        name: format(day, "EEE"),
        total: Math.round(mins / 25) 
    };
  });

  // -- 4. Subject Breakdown --
  const subjectCounts: Record<string, number> = {};
  completedTasks.forEach(t => {
      const sub = t.subject || "Other";
      subjectCounts[sub] = (subjectCounts[sub] || 0) + 1;
  });
  // Sort by count
  const topSubjects = Object.entries(subjectCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 4);

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
       <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}h</div>
            <p className="text-xs text-muted-foreground">Lifetime study time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Focus Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak} Days</div>
            <p className="text-xs text-muted-foreground">Keep the fire burning!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pomodoros</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalMinutes / 25)}</div>
            <p className="text-xs text-muted-foreground">Sessions completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Subject</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold truncate">{topSubjects[0]?.[0] || "N/A"}</div>
            <p className="text-xs text-muted-foreground">Most focused area</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Bar Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Weekly Focus</CardTitle>
            <CardDescription>Pomodoros completed this week</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <WeeklyChart data={weeklyData} />
          </CardContent>
        </Card>

        {/* Recent Breakdown */}
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Subject Breakdown</CardTitle>
                <CardDescription>Tasks completed by subject</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    {topSubjects.length === 0 && <div className="text-sm text-muted-foreground">No data yet.</div>}
                    {topSubjects.map(([subject, count]) => (
                        <div key={subject} className="flex items-center">
                             <div className="ml-4 space-y-1">
                                <p className="text-sm font-medium leading-none">{subject}</p>
                                <p className="text-sm text-muted-foreground">
                                    {count} task{count === 1 ? '' : 's'} completed
                                </p>
                             </div>
                             <div className="ml-auto font-medium">
                                {Math.round((count / completedTasks.length) * 100)}%
                             </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

