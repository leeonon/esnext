/*
  Warnings:

  - You are about to drop the column `readme` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `projects` DROP COLUMN `readme`;

-- CreateTable
CREATE TABLE `project_readme` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` MEDIUMTEXT NOT NULL,
    `project_id` INTEGER NOT NULL,

    UNIQUE INDEX `project_readme_project_id_key`(`project_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `project_readme` ADD CONSTRAINT `project_readme_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
