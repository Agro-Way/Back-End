/*
  Warnings:

  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[producerId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[categoryId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `stocks` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "deliverAt" TIMESTAMP(3),
ADD COLUMN     "delveryAddress" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'PENDENTE';

-- CreateIndex
CREATE UNIQUE INDEX "Product_producerId_key" ON "Product"("producerId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_categoryId_key" ON "Product"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_userId_key" ON "orders"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "orders_productId_key" ON "orders"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "stocks_productId_key" ON "stocks"("productId");
