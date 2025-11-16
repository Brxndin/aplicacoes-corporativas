/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `voluntarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `voluntarios_cpf_key` ON `voluntarios`(`cpf`);
