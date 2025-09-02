/*
  Warnings:

  - Added the required column `ingredients` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "ingredients" TEXT NOT NULL;
