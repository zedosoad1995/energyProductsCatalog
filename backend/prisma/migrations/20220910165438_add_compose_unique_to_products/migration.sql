/*
  Warnings:

  - A unique constraint covering the columns `[ean,providerId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_ean_providerId_key" ON "Product"("ean", "providerId");
