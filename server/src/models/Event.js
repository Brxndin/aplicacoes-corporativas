import db from '../config/database.js';

class Event
{
    static async findAll() {
        const query = `
            SELECT *
            FROM eventos
        `;

        const [rows] = await db.query(query);

        return rows;
    }

    static async find(id) {
        const query = `
            SELECT *
            FROM eventos
            WHERE id = ?
        `;

        const [rows] = await db.query(query, [id]);

        return rows;
    }
    
    static async create(evento) {
        const { nome, descricao, data_hora_inicio, data_hora_fim } = evento;

        const query = `
            INSERT INTO eventos
            (nome, descricao, data_hora_inicio, data_hora_fim)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.query(query, [nome, descricao, data_hora_inicio, data_hora_fim]);

        // retorna o id do registro recém criado
        return result.insertId;
    }
    
    static async update(id, evento) {
        const { nome, descricao, data_hora_inicio, data_hora_fim } = evento;

        const query = `
            UPDATE eventos
            SET nome = ?, descricao = ?, data_hora_inicio = ?, data_hora_fim = ?
            WHERE id = ? 
        `;

        const [result] = await db.query(query, [nome, descricao, data_hora_inicio, data_hora_fim, id]);

        return result.affectedRows;
    }
    
    static async delete(id) {
        const query = `
            DELETE FROM eventos
            WHERE id = ?
        `;

        const [result] = await db.query(query, [id]);

        return result.affectedRows;
    }
}

export default Event;