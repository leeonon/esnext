/*
  Warnings:

  - You are about to drop the `collections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects_in_collections` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `collections` DROP FOREIGN KEY `collections_userId_fkey`;

-- DropForeignKey
ALTER TABLE `projects_in_collections` DROP FOREIGN KEY `projects_in_collections_collectionId_fkey`;

-- DropForeignKey
ALTER TABLE `projects_in_collections` DROP FOREIGN KEY `projects_in_collections_projectId_fkey`;

-- DropTable
DROP TABLE `collections`;

-- DropTable
DROP TABLE `projects_in_collections`;

-- CreateTable
CREATE TABLE `favorites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `favorites_userId_name_key`(`userId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `projects_in_favorites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `favoritesId` INTEGER NOT NULL,
    `projectId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects_in_favorites` ADD CONSTRAINT `projects_in_favorites_favoritesId_fkey` FOREIGN KEY (`favoritesId`) REFERENCES `favorites`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects_in_favorites` ADD CONSTRAINT `projects_in_favorites_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
