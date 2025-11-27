import SettingsPageClient from "./client-page";
import { getTasks } from "@/app/actions/tasks";
import { getSettings } from "@/app/actions/settings";

export default async function SettingsPage() {
  const tasks = await getTasks();
  const settings = await getSettings();
  return <SettingsPageClient tasks={tasks} initialSettings={settings} />;
}
