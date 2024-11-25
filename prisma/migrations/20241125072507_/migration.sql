/*
  Warnings:

  - Added the required column `usename` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `usename` VARCHAR(60) NOT NULL;
