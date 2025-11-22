import prisma from '../config/prismaClient.js';

/**
 * @classdesc Classe com as funções de banco de dados das relações entre voluntários e eventos
 */
class VolunteerEvent {
    /**
     * Realiza a query para buscar todas as relações entre voluntários e eventos.
     * @returns {array} Lista de relações entre voluntários e eventos.
     */
    static async findAll() {
        try {
            const rows = await prisma.voluntariosEventos.findMany();

            return rows;
        } catch (error) {
            throw error;
        } finally {
            await prisma.$disconnect();
        }
    }

    /**
     * Realiza a query para buscar as relações entre voluntários e eventos pelo id do evento e id do voluntário
     * @param {json} volunteerEvent - Dados do voluntário e evento.
     * @returns {array} Lista de objetos da relação entre voluntários e eventos.
     */
    static async findVolunteerByEvent(volunteerEvent) {
        try {
            const { volunteerId, eventId } = volunteerEvent;

            const rows = await prisma.voluntariosEventos.findUnique({
                where: {
                    volunteerId: volunteerId,
                    eventId: eventId,
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
     * Realiza a query para buscar as relações entre voluntários e eventos pelo id do voluntário e data e hora de início e término
     * @param {json} volunteerEvent - Dados do voluntário e evento.
     * @returns {json} Lista de objetos da relação entre voluntários e eventos.
     */
    static async findVolunteerEventByHours(volunteerEvent) {
        try {
            const { volunteerId, eventId, dataHoraInicio, dataHoraFim } = volunteerEvent;

            const rows = await prisma.eventos.findMany({
                where: {
                    volunteer_id: volunteerId,
                    OR: [
                        {
                            dataHoraInicio: {
                                lte: dayjs(dataHoraInicio).format(),
                            },
                            dataHoraFim: {
                                gte: dayjs(dataHoraInicio).format(),
                            },
                        },
                        {
                            data_hora_inicio: {
                                lte: dayjs(dataHoraFim).format(),
                            },
                            data_hora_fim: {
                                gte: dayjs(dataHoraFim).format(),
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
     * Realiza a query para inserir uma nova relação entre voluntário e evento.
     * @param {json} volunteerEvent - Objeto com as informações do voluntário e evento.
     * @return {number} O id da nova relação entre voluntário e evento.
     */
    static async create(volunteerEvent) {
        try {
            const { volunteerId, eventId } = volunteerEvent;

            const result = await prisma.voluntariosEventos.create({
                data: {
                    voluntarioId: volunteerId,
                    eventoId: eventId,
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
     * Realiza a query para deletar os dados de uma relação entre voluntário e evento.
     * @param {number} id - Id da relação entre voluntário e evento.
     * @returns {json} Rows afetadas.
     */
    static async delete(id) {
        try {
            const result = await prisma.voluntariosEventos.delete({
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

export default VolunteerEvent;
