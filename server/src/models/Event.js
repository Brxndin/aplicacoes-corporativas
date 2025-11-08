import dayjs from 'dayjs';
import prisma from '../config/prismaClient.js';

/**
 * @classdesc Classe com as funções de banco de dados de eventos
 */
class Event {
    /**
     * Realiza a query para buscar todos os eventos.
     * @returns {array} Lista de eventos.
     */
    static async findAll() {
        try {
            const rows = await prisma.eventos.findMany();

            return rows;
        } catch (error) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * Realiza a query para buscar todos os próximos eventos.
     * @returns {array} Lista de eventos.
     */
    static async findAllNext() {
        try {
            const now = dayjs().format();

            const rows = await prisma.eventos.findMany({
                where: {
                    dataHoraInicio: {
                        gte: now,
                    },
                    OR: [
                        {
                            dataHoraFim: {
                                gt: now,
                            },
                        },
                    ],
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
     * Realiza a query para buscar um evento por id
     * @param {number} id - O id do evento.
     * @returns {json} O objeto do evento.
     */
    static async find(id) {
        try {
            const rows = await prisma.eventos.findUnique({
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
     * Realiza a query para inserir um novo evento.
     * @param {json} evento - Objeto com as informações do evento.
     * @return {number} O id do novo evento.
     */
    static async create(evento) {
        try {
            const { nome, descricao, data_hora_inicio, data_hora_fim } = evento;

            const result = await prisma.eventos.create({
                data: {
                    nome: nome,
                    descricao: descricao,
                    dataHoraInicio: data_hora_inicio,
                    dataHoraFim: data_hora_fim,
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
     * Realiza a query para atualizar os dados de um evento.
     * @param {number} id - Id do evento a ser atualizado.
     * @param {json} evento - Objeto com os novos dados do evento.
     * @returns {json} Rows afetadas.
     */
    static async update(id, evento) {
        try {
            const { nome, descricao, data_hora_inicio, data_hora_fim } = evento;

            const result = await prisma.eventos.update({
                data: {
                    nome: nome,
                    descricao: descricao,
                    dataHoraInicio: data_hora_inicio,
                    dataHoraFim: data_hora_fim,
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
     * Realiza a query para deletar os dados de um evento.
     * @param {number} id - Id do evento.
     * @returns {json} Rows afetadas.
     */
    static async delete(id) {
        try {
            const result = await prisma.eventos.delete({
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

export default Event;
