CREATE TABLE "user_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"sound_enabled" boolean DEFAULT true NOT NULL,
	"focus_duration" integer DEFAULT 25 NOT NULL,
	"short_break_duration" integer DEFAULT 5 NOT NULL,
	"long_break_duration" integer DEFAULT 15 NOT NULL,
	CONSTRAINT "user_settings_user_id_unique" UNIQUE("user_id")
);
