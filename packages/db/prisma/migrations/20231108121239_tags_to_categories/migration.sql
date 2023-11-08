/*
  Warnings:

  - You are about to drop the column `tags` on the `examples` table. All the data in the column will be lost.
  - You are about to drop the `tag_on_project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoriesId` to the `examples` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tag_on_project` DROP FOREIGN KEY `tag_on_project_project_id_fkey`;

-- DropForeignKey
ALTER TABLE `tag_on_project` DROP FOREIGN KEY `tag_on_project_tag_id_fkey`;

-- AlterTable
ALTER TABLE `examples` DROP COLUMN `tags`,
    ADD COLUMN `categoriesId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `tag_on_project`;

-- DropTable
DROP TABLE `tags`;

-- CreateTable
CREATE TABLE `categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categories_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categories_on_project` (
    `categories_id` INTEGER NOT NULL,
    `project_id` INTEGER NOT NULL,

    PRIMARY KEY (`categories_id`, `project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categories_on_project` ADD CONSTRAINT `categories_on_project_categories_id_fkey` FOREIGN KEY (`categories_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `categories_on_project` ADD CONSTRAINT `categories_on_project_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
