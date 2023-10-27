-- CreateEnum
CREATE TYPE "StatusPreparation" AS ENUM ('PEDDING', 'READY');

-- CreateTable
CREATE TABLE "foods" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "foods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "kitchen" (
    "id" SERIAL NOT NULL,
    "nameUser" TEXT NOT NULL,
    "foodId" INTEGER NOT NULL,
    "observation" TEXT,
    "preparation" "StatusPreparation" NOT NULL,

    CONSTRAINT "kitchen_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "foods" ADD CONSTRAINT "foods_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kitchen" ADD CONSTRAINT "kitchen_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "foods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
