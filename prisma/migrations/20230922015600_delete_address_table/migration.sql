/*
  Warnings:

  - You are about to drop the `addresses` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zip` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_orgId_fkey";

-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL,
ADD COLUMN     "zip" TEXT NOT NULL;

-- DropTable
DROP TABLE "addresses";
