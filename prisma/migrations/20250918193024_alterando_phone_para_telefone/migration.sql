/*
  Warnings:

  - You are about to drop the column `phone` on the `Aluno` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Aluno" DROP COLUMN "phone",
ADD COLUMN     "telefone" TEXT;
