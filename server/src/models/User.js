import db from '../config/database.js';

class User
{
    static async findAll() {
        const query = `
            SELECT *
            FROM usuarios
        `;

        const [rows] = await db.query(query);

        return rows;
    }

    static async findByEmail(email) {
        const query = `
            SELECT *
            FROM usuarios
            WHERE email = ?
        `;

        const [rows] = await db.query(query, [email]);

        return rows[0];
    }
    
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