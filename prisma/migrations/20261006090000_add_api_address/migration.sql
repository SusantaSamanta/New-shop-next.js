-- Rename table to match the lowercase `address` model (preserves data)
ALTER TABLE "public"."Address" RENAME TO "address";

-- Align constraint names with Prisma conventions for the `address` table
ALTER TABLE "public"."address" RENAME CONSTRAINT "Address_pkey" TO "address_pkey";
ALTER TABLE "public"."address" RENAME CONSTRAINT "Address_userId_fkey" TO "address_userId_fkey";

-- Add apiAddress column
ALTER TABLE "public"."address" ADD COLUMN "apiAddress" TEXT NOT NULL DEFAULT '';