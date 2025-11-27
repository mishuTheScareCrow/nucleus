"use server";

import { db } from "@/db";
import { tasks } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { eq, desc } from "drizzle-orm";

export async function getTasks() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) return [];

  return await db
    .select()
    .from(tasks)
    .where(eq(tasks.userId, session.user.id))
    .orderBy(desc(tasks.createdAt));
}

export async function createTask(data: {
  title: string;
  description?: string;
  dueDate?: Date;
  estimatedMinutes?: number;
  subject?: string;
  priorityScore?: number;
  status?: "todo" | "in_progress" | "done";
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) throw new Error("Unauthorized");

  // Simple priority calculation
  // Higher is more important
  // Base 100
  // +50 if due today/tomorrow
  // +30 if estimated time > 60 mins (hard task)
  let score = 100;
  if (data.dueDate) {
    const now = new Date();
    const diffTime = data.dueDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if (diffDays <= 2) score += 50;
    else if (diffDays <= 7) score += 20;
  }
  if (data.estimatedMinutes && data.estimatedMinutes > 60) {
    score += 30;
  }

  await db.insert(tasks).values({
    title: data.title,
    description: data.description,
    dueDate: data.dueDate,
    estimatedMinutes: data.estimatedMinutes,
    subject: data.subject,
    priorityScore: score,
    status: data.status || "todo",
    userId: session.user.id,
  });

  revalidatePath("/dashboard/tasks");
}

export async function deleteTask(id: number) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) throw new Error("Unauthorized");

    await db.delete(tasks).where(eq(tasks.id, id));
    revalidatePath("/dashboard/tasks");
}

export async function updateTaskStatus(id: number, status: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    
    if (!session?.user?.id) throw new Error("Unauthorized");

    await db.update(tasks).set({ status }).where(eq(tasks.id, id));
    revalidatePath("/dashboard/tasks");
}

