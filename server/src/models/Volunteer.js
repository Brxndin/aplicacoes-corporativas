import prisma from '../config/prismaClient.js';

/**
 * @classdesc Classe com as funções de banco de dados de voluntários
 */
class Volunteer {
    /**
     * Realiza a query para buscar todos os voluntários.
     * @returns {array} Lista de voluntários.
     */
    static async findAll() {
        try {
            const rows = await prisma.voluntarios.findMany();

            return rows;
        } catch (error) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * Realiza a query para buscar um voluntário por id
     * @param {number} id - O id do voluntário.
     * @returns {json} O objeto do voluntário.
     */
    static async find(id) {
        try {
            const rows = await prisma.voluntarios.findUnique({
                where: {
                    id: id,
                },
            });

            return rows;
        } catch (error) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * Realiza a query para buscar um voluntário por email
     * @param {string} email - O email do voluntário.
     * @returns {json} O objeto do voluntário.
     */
    static async findByEmail(email) {
        try {
            const rows = await prisma.voluntarios.findUnique({
                where: {
                    email: email,
                },
            });

            return rows;
        } catch (error) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * Realiza a query para buscar um voluntário por CPF
     * @param {string} cpf - O cpf do voluntário.
     * @returns {json} O objeto do voluntário.
     */
    static async findByCPF(cpf) {
        try {
            const rows = await prisma.voluntarios.findUnique({
                where: {
                    cpf: cpf,
                },
            });

            return rows;
        } catch (error) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * Realiza a query para inserir um novo voluntário.
     * @param {json} volunteer - Objeto com as informações do voluntário.
     * @return {number} O id do novo voluntário.
     */
    static async create(volunteer) {
        try {
            const { cpf, nome, email, telefone } = volunteer;

            const result = await prisma.voluntarios.create({
                data: {
                    cpf: cpf,
                    nome: nome,
                    email: email,
                    telefone: telefone,
                },
            });

            return result.id;
        } catch (error) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * Realiza a query para atualizar os dados de um voluntário.
     * @param {number} id - Id do voluntário a ser atualizado.
     * @param {json} volunteer - Objeto com os novos dados do voluntário.
     * @returns {json} Rows afetadas.
     */
    static async update(id, volunteer) {
        try {
            const { cpf, nome, email, telefone } = volunteer;

            const result = await prisma.voluntarios.update({
                data: {
                    cpf: cpf,
                    nome: nome,
                    email: email,
                    telefone: telefone,
                },
                where: {
                    id: id,
                },
            });

            return result;
        } catch (error) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * Realiza a query para deletar os dados de um voluntário.
     * @param {number} id - Id do voluntário.
     * @returns {json} Rows afetadas.
     */
    static async delete(id) {
        try {
            const result = await prisma.voluntarios.delete({
                where: {
                    id: id,
                },
            });

            return result;
        } catch (error) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }
}

export default Volunteer;
