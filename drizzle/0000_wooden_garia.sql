CREATE TABLE IF NOT EXISTS "emails" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"sender" text,
	"recipient" text,
	"subject" text,
	"body" text,
	"status" text,
	"created_at" timestamp DEFAULT now()
);
