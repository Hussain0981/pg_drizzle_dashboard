CREATE TYPE "public"."admin_role" AS ENUM('Admin', 'User');--> statement-breakpoint
CREATE TABLE "admin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" "admin_role" DEFAULT 'Admin' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX "admin_email_idx" ON "admin" USING btree ("email");