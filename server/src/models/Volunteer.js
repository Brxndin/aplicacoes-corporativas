import db from '../config/database.js';

class Volunteer
{
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM voluntarios');

        return rows;
    }
    
    static async create(volunteer) {
        const { cpf, nome, email, telefone } = volunteer;

        const [result] = await db.query('INSERT INTO voluntarios (cfp, nome, email, telefone) VALUES (?, ?, ?, ?)', [cpf, nome, email, telefone]);

        // retorna o id do registro recém criado
        return result.insertId;
    }
    
    static async update(id, volunteer) {
        const { cpf, nome, email, telefone } = volunteer;

        const [result] = await db.query('UPDATE voluntarios SET cpf = ?, nome = ?, email = ?, telefone = ? WHERE id = ? ', [cpf, nome, email, telefone, id]);

        return result.affectedRows;
    }
    
    static async delete(id) {
        const [result] = await db.query('DELETE FROM voluntarios WHERE id = ?', [id]);

        return result.affectedRows;
    }
}

export default Volunteer;