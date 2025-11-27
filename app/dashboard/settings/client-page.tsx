"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Download, Trash2, Loader2 } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DailyPlanPDF } from "@/components/daily-plan-pdf";
import { Task } from "@/app/dashboard/tasks/tasks-table";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { updateSettings, UserSettings } from "@/app/actions/settings";
import { useState, useEffect } from "react";

export default function SettingsPage({
    tasks = [],
    initialSettings
}: { tasks?: Task[], initialSettings: UserSettings | null }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    soundEnabled: initialSettings?.soundEnabled ?? true,
    focusDuration: initialSettings?.focusDuration ?? 25,
    shortBreakDuration: initialSettings?.shortBreakDuration ?? 5,
    longBreakDuration: initialSettings?.longBreakDuration ?? 15,
  });
  
  // React PDF needs to render client-side to avoid hydration mismatch
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDeleteAccount = async () => {
    const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.");
    if (confirmed) {
        try {
            await authClient.signOut();
            router.push("/");
            toast.success("Account deleted successfully");
        } catch (error) {
            toast.error("Failed to delete account");
        }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
        await updateSettings(settings);
        toast.success("Preferences saved");
    } catch (error) {
        console.error(error);
        toast.error("Failed to save settings");
    } finally {
        setSaving(false);
    }
  };

  return (
    <div className="space-y-6 p-8 md:block">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <Separator />
      
      <div className="grid gap-6">
        {/* Preferences Card */}
        <Card>
            <CardHeader>
                <CardTitle>Timer Preferences</CardTitle>
                <CardDescription>Customize your focus sessions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base">Sound Effects</Label>
                        <p className="text-sm text-muted-foreground">
                            Play sounds when timer starts or ends.
                        </p>
                    </div>
                    <Switch 
                        checked={settings.soundEnabled}
                        onCheckedChange={(v) => setSettings(s => ({...s, soundEnabled: v}))}
                    />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label>Focus (min)</Label>
                        <Input 
                            type="number" 
                            value={settings.focusDuration} 
                            onChange={(e) => setSettings(s => ({...s, focusDuration: parseInt(e.target.value) || 25}))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Short Break (min)</Label>
                        <Input 
                            type="number" 
                            value={settings.shortBreakDuration} 
                            onChange={(e) => setSettings(s => ({...s, shortBreakDuration: parseInt(e.target.value) || 5}))}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Long Break (min)</Label>
                        <Input 
                            type="number" 
                            value={settings.longBreakDuration} 
                            onChange={(e) => setSettings(s => ({...s, longBreakDuration: parseInt(e.target.value) || 15}))}
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button onClick={handleSave} disabled={saving}>
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </CardFooter>
        </Card>

        {/* Export Card */}
        <Card>
             <CardHeader>
                <CardTitle>Export Data</CardTitle>
                <CardDescription>Download your daily plan and task history.</CardDescription>
            </CardHeader>
            <CardContent>
                 {isClient && (
                     <PDFDownloadLink document={<DailyPlanPDF tasks={tasks} />} fileName="nucleus-plan.pdf">
                        {({ loading }) => (
                            <Button variant="outline" disabled={loading}>
                                <Download className="mr-2 h-4 w-4" />
                                {loading ? 'Generating PDF...' : 'Download Daily Plan (PDF)'}
                            </Button>
                        )}
                     </PDFDownloadLink>
                 )}
            </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50">
            <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
