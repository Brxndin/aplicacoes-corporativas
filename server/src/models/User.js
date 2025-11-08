import prisma from '../config/prismaClient.js';

/**
 * @classdesc Classe com as funções de banco de dados de usuários
 */
class User {
    /**
     * Realiza a query para buscar todos os usuários.
     * @returns {array} Lista de usuários.
     */
    static async findAll() {
        try {
            const rows = await prisma.usuarios.findMany();

            return rows;
        } catch (error) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * Realiza a query para buscar um usuário por id
     * @param {number} id - O id do usuario.
     * @returns {json} O objeto do usuario.
     */
    static async find(id) {
        try {
            const rows = await prisma.usuarios.findUnique({
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
     * Realiza a query para buscar um usuário por email
     * @param {string} email - O email do usuario.
     * @returns {json} O objeto do usuario.
     */
    static async findByEmail(email) {
        try {
            const rows = await prisma.usuarios.findUnique({
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
     * Realiza a query para inserir um novo usuário.
     * @param {json} usuario - Objeto com as informações do usuário.
     * @return {number} O id do novo usuário.
     */
    static async create(usuario) {
        try {
            const { nome, email, tipo, senha } = usuario;

            const result = await prisma.usuarios.create({
                data: {
                    nome: nome,
                    email: email,
                    tipo: tipo,
                    senha: senha,
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
     * Realiza a query para atualizar os dados de um usuário.
     * @param {number} id - Id do usuário a ser atualizado.
     * @param {json} usuario - Objeto com os novos dados do usuário.
     * @returns {json} Rows afetadas.
     */
    static async update(id, usuario) {
        try {
            const { nome, email, tipo, senha } = usuario;

            const result = await prisma.usuarios.update({
                data: {
                    nome: nome,
                    email: email,
                    tipo: tipo,
                    senha: senha,
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
     * Realiza a query para deletar os dados de um usuário.
     * @param {number} id - Id do usuário.
     * @returns {json} Rows afetadas.
     */
    static async delete(id) {
        try {
            const result = await prisma.usuarios.delete({
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

export default User;
