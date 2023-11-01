/*
  Warnings:

  - The values [PEDDING] on the enum `StatusPreparation` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusPreparation_new" AS ENUM ('PREPARING', 'READY');
ALTER TABLE "kitchen" ALTER COLUMN "preparation" TYPE "StatusPreparation_new" USING ("preparation"::text::"StatusPreparation_new");
ALTER TYPE "StatusPreparation" RENAME TO "StatusPreparation_old";
ALTER TYPE "StatusPreparation_new" RENAME TO "StatusPreparation";
DROP TYPE "StatusPreparation_old";
COMMIT;
