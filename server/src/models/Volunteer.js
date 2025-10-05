import db from '../config/database.js';

class Volunteer
{
    static async findAll() {
        const query = `
            SELECT *
            FROM voluntarios
        `;

        const [rows] = await db.query(query);

        return rows;
    }

    static async findByEmail(email) {
        const query = `
            SELECT *
            FROM voluntarios
            WHERE email = ?
        `;

        const [rows] = await db.query(query, [email]);

        return rows[0];
    }

    static async findByCPF(cpf) {
        const query = `
            SELECT *
            FROM voluntarios
            WHERE cpf = ?
        `;

        const [rows] = await db.query(query, [cpf]);

        return rows[0];
    }
    
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