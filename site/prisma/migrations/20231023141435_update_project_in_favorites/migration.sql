/*
  Warnings:

  - A unique constraint covering the columns `[projectId,favoritesId]` on the table `projects_in_favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `projects_in_favorites_projectId_favoritesId_key` ON `projects_in_favorites`(`projectId`, `favoritesId`);
