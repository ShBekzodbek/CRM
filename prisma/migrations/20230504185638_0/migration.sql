/*
  Warnings:

  - You are about to drop the column `role` on the `ExInfo` table. All the data in the column will be lost.
  - Added the required column `userId` to the `ExInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExInfo" DROP COLUMN "role",
ADD COLUMN     "position" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ExInfo" ADD CONSTRAINT "ExInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
