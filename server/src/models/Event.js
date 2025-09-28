class Event
{
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM events');

        return rows;
    }
    
    static async create(event) {
        const { name, email } = event;

        const [result] = await db.query('INSERT INTO events (name, email) VALUES (?, ?)', [name, email]);

        // retorna o id do registro recém criado
        return result.insertId;
    }
    
    static async update(id, event) {
        const { name, email } = event;

        const [result] = await db.query('UPDATE events SET name = ?, email = ? WHERE id = ? ', [name, email, id]);

        return result.affectedRows;
    }
    
    static async delete(id) {
        const [result] = await db.query('DELETE FROM events WHERE id = ?', [id]);

        return result.affectedRows;
    }
}

export default Event;