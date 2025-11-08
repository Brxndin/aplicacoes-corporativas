/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `voluntarios` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `eventos` MODIFY `nome` VARCHAR(200) NOT NULL,
    MODIFY `descricao` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `usuarios` MODIFY `nome` VARCHAR(200) NOT NULL,
    MODIFY `email` VARCHAR(200) NOT NULL,
    MODIFY `senha` VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE `voluntarios` MODIFY `nome` VARCHAR(200) NOT NULL,
    MODIFY `email` VARCHAR(200) NOT NULL,
    MODIFY `telefone` VARCHAR(200) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `voluntarios_email_key` ON `voluntarios`(`email`);
