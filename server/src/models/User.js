import db from '../config/database.js';

class User
{
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM usuarios');

        return rows;
    }

    static async findByEmail(email) {
        const [rows] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        return rows[0];
    }
    
    static async create(usuario) {
        const { nome, email, senha } = usuario;

        const [result] = await db.query('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)', [nome, email, senha]);

        // retorna o id do registro recém criado
        return result.insertId;
    }
    
    static async update(id, usuario) {
        const { nome, email, senha } = usuario;

        const [result] = await db.query('UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ? ', [nome, email, senha, id]);

        return result.affectedRows;
    }
    
    static async delete(id) {
        const [result] = await db.query('DELETE FROM usuarios WHERE id = ?', [id]);

        return result.affectedRows;
    }
}

export default User;