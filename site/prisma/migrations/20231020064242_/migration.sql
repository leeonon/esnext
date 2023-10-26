/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `collections` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `collections_userId_name_key` ON `collections`(`userId`, `name`);
