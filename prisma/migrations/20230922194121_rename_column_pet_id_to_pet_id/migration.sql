/*
  Warnings:

  - You are about to drop the column `petId` on the `photos` table. All the data in the column will be lost.
  - Added the required column `pet_id` to the `photos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "photos" DROP CONSTRAINT "photos_petId_fkey";

-- AlterTable
ALTER TABLE "photos" DROP COLUMN "petId",
ADD COLUMN     "pet_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "photos" ADD CONSTRAINT "photos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
