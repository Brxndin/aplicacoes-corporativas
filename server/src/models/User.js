import db from '../config/database.js';

/**
 * @classdesc Classe com as funções de banco de dados de usuários
 */
class User
{
    /**
     * Busca uma lista com todos os usuários.
     * @returns {array} Lista de usuários.
     */
    static async findAll() {
        const query = `
            SELECT *
            FROM usuarios
        `;

        const [rows] = await db.query(query);

        return rows;
    }

    /**
     * Busca um usuário por id
     * @param {number} id - O id do usuario.
     * @returns {json} O objeto do usuario.
     */
    static async find(id) {
        const query = `
            SELECT *
            FROM usuarios
            WHERE id = ?
        `;

        const [rows] = await db.query(query, [id]);

        return rows;
    }

    /**
     * Busca um usuário por email
     * @param {string} email - O email do usuario.
     * @returns {json} O objeto do usuario.
     */
    static async findByEmail(email) {
        const query = `
            SELECT *
            FROM usuarios
            WHERE email = ?
        `;

        const [rows] = await db.query(query, [email]);

        return rows[0];
    }
    
    /**
     * Insere um novo usuário.
     * @param {json} usuario - Objeto com as informações do usuário.
     * @return {number} O id do novo usuário.
     */
    static async create(usuario) {
        const { nome, email, tipo, senha } = usuario;

        const query = `
            INSERT INTO usuarios
            (nome, email, tipo, senha)
            VALUES (?, ?, ?, ?)
        `;

        const [result] = await db.query(query, [nome, email, tipo, senha]);

        // retorna o id do registro recém criado
        return result.insertId;
    }
    
    /**
     * Atualiza os dados de um usuário.
     * @param {number} id - Id do usuário a ser atualizado.
     * @param {json} usuario - Objeto com os novos dados do usuário.
     * @returns {json} Rows afetadas.
     */
    static async update(id, usuario) {
        const { nome, email, tipo, senha } = usuario;

        const query = `
            UPDATE usuarios
            SET nome = ?, email = ?, tipo = ?, senha = ?
            WHERE id = ?
        `;

        const [result] = await db.query(query, [nome, email, tipo, senha, id]);

        return result.affectedRows;
    }
    
    /**
     * Deleta os dados de um usuário.
     * @param {number} id - Id do usuário.
     * @returns {json} Rows afetadas.
     */
    static async delete(id) {
        const query = `
            DELETE FROM usuarios
            WHERE id = ?
        `;

        const [result] = await db.query(query, [id]);

        return result.affectedRows;
    }
}

export default User;