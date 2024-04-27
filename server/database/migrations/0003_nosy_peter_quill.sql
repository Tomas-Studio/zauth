ALTER TYPE "auth_type" ADD VALUE 'email';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "auth_type" SET DEFAULT 'email';