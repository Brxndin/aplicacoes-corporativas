class Volunteer
{
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM volunteers');

        return rows;
    }
    
    static async create(volunteer) {
        const { name, email } = volunteer;

        const [result] = await db.query('INSERT INTO volunteers (name, email) VALUES (?, ?)', [name, email]);

        // retorna o id do registro recém criado
        return result.insertId;
    }
    
    static async update(id, volunteer) {
        const { name, email } = volunteer;

        const [result] = await db.query('UPDATE volunteers SET name = ?, email = ? WHERE id = ? ', [name, email, id]);

        return result.affectedRows;
    }
    
    static async delete(id) {
        const [result] = await db.query('DELETE FROM volunteers WHERE id = ?', [id]);

        return result.affectedRows;
    }
}

export default Volunteer;