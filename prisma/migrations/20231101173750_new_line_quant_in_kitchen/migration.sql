/*
  Warnings:

  - Added the required column `quant` to the `kitchen` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "kitchen" ADD COLUMN     "quant" INTEGER NOT NULL;
