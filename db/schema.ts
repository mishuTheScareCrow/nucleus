import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  dueDate: timestamp("due_date"),
  estimatedMinutes: integer("estimated_minutes"),
  subject: text("subject"),
  priorityScore: integer("priority_score"),
  status: text("status").default("todo").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userSettings = pgTable("user_settings", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  soundEnabled: boolean("sound_enabled").default(true).notNull(),
  focusDuration: integer("focus_duration").default(25).notNull(),
  shortBreakDuration: integer("short_break_duration").default(5).notNull(),
  longBreakDuration: integer("long_break_duration").default(15).notNull(),
});
