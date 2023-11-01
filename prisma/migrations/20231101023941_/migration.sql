/*
  Warnings:

  - Changed the type of `change` on the `kitchen` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "kitchen" DROP COLUMN "change",
ADD COLUMN     "change" INTEGER NOT NULL;
