/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `CatalogUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CatalogUrl_url_key" ON "CatalogUrl"("url");
