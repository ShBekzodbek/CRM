/*
  Warnings:

  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(12)`.
  - Made the column `createdAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNumber` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `employeeId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `adminId` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isAdmin` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `step` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isBanned` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `position` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_employeeId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL,
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "image" SET DEFAULT '',
ALTER COLUMN "phoneNumber" SET NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(12),
ALTER COLUMN "employeeId" SET NOT NULL,
ALTER COLUMN "employeeId" SET DEFAULT '',
ALTER COLUMN "adminId" SET NOT NULL,
ALTER COLUMN "adminId" SET DEFAULT '',
ALTER COLUMN "isAdmin" SET NOT NULL,
ALTER COLUMN "step" SET NOT NULL,
ALTER COLUMN "step" SET DEFAULT '',
ALTER COLUMN "isBanned" SET NOT NULL,
ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "position" SET DEFAULT '',
ALTER COLUMN "status" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
