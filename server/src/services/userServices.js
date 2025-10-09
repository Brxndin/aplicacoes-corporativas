import User from "../models/User.js";

/**
 * @classdesc Classe com as funções que aplicam regras de negócio nas operações de usuários
 */
class UserServices
{
    // constantes para o tipo de usuário
    static ADM = 1;
    static PADRAO = 2;

    /**
     * Busca todos os usuários aplicando regras
     * @returns {array} Lista de usuários.
     */
    static async getAllUsers() {
        const users = await User.findAll();

        // aqui traduz o tipo conforme as constantes
        users.map((user) => {
            user.tipo = user.tipo == this.ADM ? 'Administrador' : 'Padrão';

            return user;
        });

        return users;
    }

    /**
     * Busca um usuário por id aplicando regras
     * @param {number} id - O id do usuário.
     * @returns {json} O objeto do usuário.
     */
    static async getOneUser(id) {
        const users = await User.find(id);

        if (users.length != 1) {
            throw new Error('Usuário não encontrado!');
        }

        const user = users[0];

        return user;
    }

    /**
     * Insere um novo usuário aplicando regras.
     * @param {json} user - Objeto com as informações do usuário.
     * @return {number} O id do novo usuário.
     */
    static async createUser(user) {
        // verifica se o usuário já existe por e-mail
        const emailExists = await User.findByEmail(user.email);

        if (emailExists) {
            throw new Error("O e-mail informado já está em uso!");
        }

        if (![this.ADM, this.PADRAO].includes(parseInt(user.tipo))) {
            throw new Error("O usuário deve ser Administrador ou Padrão!");
        }

        // seria interessante colocar regra para validar senha com números, letras maiúsculas e minúsuclas e símbolos

        return await User.create(user);
    }
    
    /**
     * Atualiza os dados de um usuário aplicando regras.
     * @param {number} id - Id do usuário a ser atualizado.
     * @param {json} user - Objeto com os novos dados do usuário.
     * @returns {json} Rows afetadas.
     */
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
    
    /**
     * Deleta os dados de um usuário aplicando regras.
     * @param {number} id - Id do usuário.
     * @returns {json} Rows afetadas.
     */
    static async deleteUser(id) {
        const deletedRows = await User.delete(id);

        if (deletedRows === 0) {
            throw new Error("Usuário não encontrado!");
        }

        return deletedRows;
    }
}

export default UserServices;