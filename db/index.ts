import { config } from "dotenv";
config(); // Load .env since .env.local doesn't exist

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// Debug logging
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);
