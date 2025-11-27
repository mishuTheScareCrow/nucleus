import { TasksTable } from "./tasks-table";
import { getTasks } from "@/app/actions/tasks";

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Tasks</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this semester.
          </p>
        </div>
      </div>
      <TasksTable data={tasks} />
    </div>
  );
}

