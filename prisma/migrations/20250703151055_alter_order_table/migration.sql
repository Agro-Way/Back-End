/*
  Warnings:

  - You are about to drop the column `delveryAddress` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[addressId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `addressId` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "delveryAddress",
ADD COLUMN     "addressId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orders_addressId_key" ON "orders"("addressId");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
