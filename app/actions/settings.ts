"use server";

import { db } from "@/db";
import { userSettings } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export type UserSettings = typeof userSettings.$inferSelect;

export async function getSettings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) return null;

  const settings = await db
    .select()
    .from(userSettings)
    .where(eq(userSettings.userId, session.user.id))
    .limit(1);

  return settings[0] || null;
}

export async function updateSettings(data: Partial<UserSettings>) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) throw new Error("Unauthorized");

    const existing = await getSettings();

    if (existing) {
        await db.update(userSettings)
            .set({
                ...data,
            })
            .where(eq(userSettings.userId, session.user.id));
    } else {
        await db.insert(userSettings).values({
            userId: session.user.id,
            soundEnabled: data.soundEnabled ?? true,
            focusDuration: data.focusDuration ?? 25,
            shortBreakDuration: data.shortBreakDuration ?? 5,
            longBreakDuration: data.longBreakDuration ?? 15,
        });
    }
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/settings");
}

