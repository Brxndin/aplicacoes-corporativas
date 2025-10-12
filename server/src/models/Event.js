import db from '../config/database.js';

/**
 * @classdesc Classe com as funções de banco de dados de eventos
 */
class Event
{
    /**
     * Realiza a query para buscar todos os eventos.
     * @returns {array} Lista de eventos.
     */
    static async findAll() {
        const query = `
            SELECT *
            FROM eventos
        `;

        const [rows] = await db.query(query);

        return rows;
    }

    /**
     * Realiza a query para buscar todos os próximos eventos.
     * @returns {array} Lista de eventos.
     */
    static async findAllNext() {
        const query = `
            SELECT *
            FROM eventos
            WHERE data_hora_inicio >= NOW()
            OR data_hora_fim > NOW()
        `;

        const [rows] = await db.query(query);

        return rows;
    }

    /**
     * Realiza a query para buscar um evento por id
     * @param {number} id - O id do evento.
     * @returns {json} O objeto do evento.
     */
    static async find(id) {
        const query = `
            SELECT *
            FROM eventos
            WHERE id = ?
        `;

        const [rows] = await db.query(query, [id]);

        return rows;
    }
    
    /**
     * Realiza a query para inserir um novo evento.
     * @param {json} evento - Objeto com as informações do evento.
     * @return {number} O id do novo evento.
     */
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
    
    /**
     * Realiza a query para atualizar os dados de um evento.
     * @param {number} id - Id do evento a ser atualizado.
     * @param {json} evento - Objeto com os novos dados do evento.
     * @returns {json} Rows afetadas.
     */
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
    
    /**
     * Realiza a query para deletar os dados de um evento.
     * @param {number} id - Id do evento.
     * @returns {json} Rows afetadas.
     */
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