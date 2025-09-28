class User
{
    static async findAll() {
        const [rows] = await db.query('SELECT * FROM users');

        return rows;
    }
    
    static async create(user) {
        const { name, email } = user;

        const [result] = await db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);

        // retorna o id do registro recém criado
        return result.insertId;
    }
    
    static async update(id, user) {
        const { name, email } = user;

        const [result] = await db.query('UPDATE users SET name = ?, email = ? WHERE id = ? ', [name, email, id]);

        return result.affectedRows;
    }
    
    static async delete(id) {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);

        return result.affectedRows;
    }
}

export default User;