import db from '../config/database.js';

/**
 * @classdesc Classe com as funções de banco de dados de voluntários
 */
class Volunteer
{
    /**
     * Realiza a query para buscar todos os voluntários.
     * @returns {array} Lista de voluntários.
     */
    static async findAll() {
        const query = `
            SELECT *
            FROM voluntarios
        `;

        const [rows] = await db.query(query);

        return rows;
    }

    /**
     * Realiza a query para buscar um voluntário por id
     * @param {number} id - O id do voluntário.
     * @returns {json} O objeto do voluntário.
     */
    static async find(id) {
        const query = `
            SELECT *
            FROM voluntarios
            WHERE id = ?
        `;

        const [rows] = await db.query(query, [id]);

        return rows;
    }

    /**
     * Realiza a query para buscar um voluntário por email
     * @param {string} email - O email do voluntário.
     * @returns {json} O objeto do voluntário.
     */
    static async findByEmail(email) {
        const query = `
            SELECT *
            FROM voluntarios
            WHERE email = ?
        `;

        const [rows] = await db.query(query, [email]);

        return rows[0];
    }

    /**
     * Realiza a query para buscar um voluntário por CPF
     * @param {string} cpf - O cpf do voluntário.
     * @returns {json} O objeto do voluntário.
     */
    static async findByCPF(cpf) {
        const query = `
            SELECT *
            FROM voluntarios
            WHERE cpf = ?
        `;

        const [rows] = await db.query(query, [cpf]);

        return rows[0];
    }
    
    /**
     * Realiza a query para inserir um novo voluntário.
     * @param {json} volunteer - Objeto com as informações do voluntário.
     * @return {number} O id do novo voluntário.
     */
    static async create(volunteer) {
        const { cpf, nome, email, telefone } = volunteer;

        const query = `
            INSERT INTO voluntarios
            (cpf, nome, email, telefone)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.query(query, [cpf, nome, email, telefone]);

        // retorna o id do registro recém criado
        return result.insertId;
    }
    
    /**
     * Realiza a query para atualizar os dados de um voluntário.
     * @param {number} id - Id do voluntário a ser atualizado.
     * @param {json} volunteer - Objeto com os novos dados do voluntário.
     * @returns {json} Rows afetadas.
     */
    static async update(id, volunteer) {
        const { cpf, nome, email, telefone } = volunteer;

        const query = `
            UPDATE voluntarios
            SET cpf = ?, nome = ?, email = ?, telefone = ?
            WHERE id = ?
        `;

        const [result] = await db.query(query, [cpf, nome, email, telefone, id]);

        return result.affectedRows;
    }
    
    /**
     * Realiza a query para deletar os dados de um voluntário.
     * @param {number} id - Id do voluntário.
     * @returns {json} Rows afetadas.
     */
    static async delete(id) {
        const query = `
            DELETE FROM voluntarios
            WHERE id = ?
        `;

        const [result] = await db.query(query, [id]);

        return result.affectedRows;
    }
}

export default Volunteer;