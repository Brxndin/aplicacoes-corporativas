import User from "../models/User.js";

class UserServices
{
    // constantes para o tipo de usuário
    ADM = 1;
    PADRAO = 2;

    static async getAllUsers() {
        return await User.findAll();
    }

    static async createUser(user) {
        // verifica se o usuário já existe por e-mail
        const emailExists = await User.findByEmail(user.email);

        if (emailExists) {
            throw new Error("O e-mail informado já está em uso!");
        }
        
        if (![this.ADM, this.PADRAO].includes(user?.tipo)) {
            throw new Error("O usuário deve ser Administrador ou Padrão!");
        }

        // seria interessante colocar regra para validar senha com números, letras maiúsculas e minúsuclas e símbolos

        return await User.create(user);
    }
    
    static async updateUser(id, user) {
        // verifica se o usuário já existe por e-mail e por cpf
        const userWithEmail = await User.findByEmail(user.email);

        if (userWithEmail && userWithEmail.id != id) {
            throw new Error("O e-mail informado já está em uso!");
        }

        if (![this.ADM, this.PADRAO].includes(user?.tipo)) {
            throw new Error("O usuário deve ser Administrador ou Padrão!");
        }

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