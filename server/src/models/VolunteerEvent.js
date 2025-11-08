import db from '../config/mysql2.js';

/**
 * @classdesc Classe com as funções de banco de dados das relações entre voluntários e eventos
 */
class VolunteerEvent
{
    /**
     * Realiza a query para buscar todas as relações entre voluntários e eventos.
     * @returns {array} Lista de relações entre voluntários e eventos.
     */
    static async findAll() {
        const query = `
            SELECT *
            FROM voluntario_eventos
        `;

        const [rows] = await db.query(query);

        return rows;
    }

    /**
     * Realiza a query para buscar as relações entre voluntários e eventos pelo id do evento e id do voluntário
     * @param {json} volunteerEvent - Dados do voluntário e evento.
     * @returns {array} Lista de objetos da relação entre voluntários e eventos.
     */
    static async findVolunteerByEvent(volunteerEvent) {
        const { volunteerId, eventId } = volunteerEvent;

        const query = `
            SELECT *
            FROM voluntario_eventos
            WHERE volunteer_id = ?
            AND event_id = ?
        `;

        const [rows] = await db.query(query, [volunteerId, eventId]);

        return rows;
    }

    /**
     * Realiza a query para buscar as relações entre voluntários e eventos pelo id do voluntário e data e hora de início e término
     * @param {json} volunteerEvent - Dados do voluntário e evento.
     * @returns {json} Lista de objetos da relação entre voluntários e eventos.
     */
    static async findVolunteerEventByHours(volunteerEvent) {
        const { volunteerId, eventId, dataHoraInicio, dataHoraFim } = volunteerEvent;

        const query = `
            SELECT *
            FROM voluntario_eventos
            WHERE volunteer_id = ?
            AND (
                (? BETWEEN data_hora_inicio AND data_hora_fim) OR (? BETWEEN data_hora_inicio AND data_hora_fim)
            )
        `;

        const [rows] = await db.query(query, [volunteerId, dataHoraInicio, dataHoraFim]);

        return rows;
    }
    
    /**
     * Realiza a query para inserir uma nova relação entre voluntário e evento.
     * @param {json} volunteerEvent - Objeto com as informações do voluntário e evento.
     * @return {number} O id da nova relação entre voluntário e evento.
     */
    static async create(volunteerEvent) {
        const { volunteerId, eventId } = volunteerEvent;

        const query = `
            INSERT INTO voluntario_eventos
            (voluntario_id, evento_id)
            VALUES (?, ?)
        `;

        const [result] = await db.query(query, [volunteerId, eventId]);

        // retorna o id do registro recém criado
        return result.insertId;
    }
    
    /**
     * Realiza a query para deletar os dados de uma relação entre voluntário e evento.
     * @param {number} id - Id da relação entre voluntário e evento.
     * @returns {json} Rows afetadas.
     */
    static async delete(id) {
        const query = `
            DELETE FROM voluntario_eventos
            WHERE id = ?
        `;

        const [result] = await db.query(query, [id]);

        return result.affectedRows;
    }
}

export default VolunteerEvent;