/*
  Warnings:

  - You are about to drop the column `categoryId` on the `foods` table. All the data in the column will be lost.
  - You are about to drop the `categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `foods` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('COMBOS', 'FOLLOWUP', 'DRINKS', 'DESSERTS');

-- DropForeignKey
ALTER TABLE "foods" DROP CONSTRAINT "foods_categoryId_fkey";

-- AlterTable
ALTER TABLE "foods" DROP COLUMN "categoryId",
ADD COLUMN     "category" "Category" NOT NULL;

-- DropTable
DROP TABLE "categories";
