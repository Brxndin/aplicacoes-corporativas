const db = require('../config/database');

class Event
{
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM eventos');

        return rows;
    }
    
    static async create(evento) {
        const { nome, descricao, data_hora_inicio, data_hora_fim } = evento;

        const [result] = await db.query('INSERT INTO eventos (nome, descricao, data_hora_inicio, data_hora_fim) VALUES (?, ?, ?, ?)', [nome, descricao, data_hora_inicio, data_hora_fim]);

        // retorna o id do registro recém criado
        return result.insertId;
    }
    
    static async update(id, evento) {
        const { nome, descricao, data_hora_inicio, data_hora_fim } = evento;

        const [result] = await db.query('UPDATE eventos SET nome = ?, descricao = ?, data_hora_inicio = ?, data_hora_fim = ? WHERE id = ? ', [nome, descricao, data_hora_inicio, data_hora_fim, id]);

        return result.affectedRows;
    }
    
    static async delete(id) {
        const [result] = await db.query('DELETE FROM eventos WHERE id = ?', [id]);

        return result.affectedRows;
    }
}

export default Event;