import db from '../config/database.js';

class VolunteerEvent
{
    static async findAll() {
        const query = `
            SELECT *
            FROM voluntario_eventos
        `;

        const [rows] = await db.query(query);

        return rows;
    }

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