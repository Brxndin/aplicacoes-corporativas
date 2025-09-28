const User = require("../models/User");

class UserServices {
    static async getAllUsers() {
        return await User.findAll();
    }

    static async createUser(user) {
        // verificar qual regra de negócio aplicar
        const userExists = await User.findByEmail(user.email);

        if (userExists) {
            throw new Error("Usuário já cadastrado!");
        }

        // seria interessante colocar regra para validar senha com números, letras maiúsculas e minúsuclas e símbolos

        return await User.create(user);
    }
    
    static async updateUser(id, user) {
        const updatedRows = await User.update(id, user);

        if (updatedRows === 0) {
            throw new Error("Usuário não encontrado!");
        }

        return updatedRows;
    }
    
    static async deleteUser(id) {
        const deletedRows = await User.delete(id);

        if (deletedRows === 0) {
            throw new Error("Usuário não encontrado!");
        }

        return deletedRows;
    }
}

export default UserServices;