ALTER TABLE "admin" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "admin" ALTER COLUMN "role" SET DEFAULT 'super_admin'::text;--> statement-breakpoint
DROP TYPE "public"."admin_role";--> statement-breakpoint
CREATE TYPE "public"."admin_role" AS ENUM('super_admin');--> statement-breakpoint
ALTER TABLE "admin" ALTER COLUMN "role" SET DEFAULT 'super_admin'::"public"."admin_role";--> statement-breakpoint
ALTER TABLE "admin" ALTER COLUMN "role" SET DATA TYPE "public"."admin_role" USING "role"::"public"."admin_role";