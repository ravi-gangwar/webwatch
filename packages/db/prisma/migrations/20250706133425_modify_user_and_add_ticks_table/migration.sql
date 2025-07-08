/*
  Warnings:

  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TickStatus" AS ENUM ('SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "ticks" (
    "id" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "status" "TickStatus" NOT NULL,
    "responseTime" INTEGER NOT NULL,
    "responseCode" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ticks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ticks" ADD CONSTRAINT "ticks_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "websites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
