const db = require('../config/database');

class VolunteerEvent
{
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM voluntario_eventos');

        return rows;
    }

    static async findByEvent(volunteerEvent) {
        const { volunteerId, eventId } = volunteerEvent;

        const [rows] = await db.query('SELECT * FROM voluntario_eventos WHERE volunteer_id = ? AND event_id = ?', [volunteerId, eventId]);

        return rows;
    }
    
    static async create(volunteerEvent) {
        const { volunteerId, eventId } = volunteerEvent;

        const [result] = await db.query('INSERT INTO voluntario_eventos (voluntario_id, evento_id) VALUES (?, ?)', [volunteerId, eventId]);

        // retorna o id do registro recém criado
        return result.insertId;
    }
    
    static async delete(id) {
        const [result] = await db.query('DELETE FROM voluntario_eventos WHERE id = ?', [id]);

        return result.affectedRows;
    }
}

export default VolunteerEvent;