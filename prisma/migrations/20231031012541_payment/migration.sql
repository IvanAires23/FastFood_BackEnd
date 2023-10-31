/*
  Warnings:

  - Added the required column `change` to the `kitchen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment` to the `kitchen` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentForm" AS ENUM ('CREDIT', 'DEBIT', 'MONEY');

-- AlterTable
ALTER TABLE "kitchen" ADD COLUMN     "change" TEXT NOT NULL,
ADD COLUMN     "payment" "PaymentForm" NOT NULL;
