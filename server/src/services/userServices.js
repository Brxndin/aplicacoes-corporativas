import CustomError from '../helpers/customError.js';
import User from '../models/User.js';

/**
 * @classdesc Classe com as funções que aplicam regras de negócio nas operações de usuários
 */
class UserServices {
    // constantes para o tipo de usuário
    static ADM = 1;
    static PADRAO = 2;

    /**
     * Verifica se o dado informado é um numeral válido
     * @param {any} data Dado a ser verificado.
     * @returns {boolean}
     */
    static isValidNumber(data) {
        const type = typeof data;

        if (type === 'number') {
            return Number.isFinite(data);
        }

        if (type === 'string') {
            if (data.trim() === "") {
                return false;
            }

            const num = +data;

            return Number.isFinite(num);
        }
        
        return false;
    }

    /**
     * Valida e trata o tipo do usuário
     * @param {json} user - Objeto com as informações do usuário.
     * @returns {void}
     */
    static validateUserType(user) {
        // realiza validações no Tipo
        if (!this.isValidNumber(user.tipo)) {
            throw new CustomError('O Tipo do usuário deve ser um número válido!');
        }

        user.tipo = parseInt(user.tipo);

        if (![this.ADM, this.PADRAO].includes(parseInt(user.tipo))) {
            throw new CustomError('O usuário deve ser Administrador ou Padrão!', 500);
        }
    }

    /**
     * Aplica regras em todos os usuários informados
     * @param {array} users Lista de usuários.
     * @returns {void}
     */
    static getAllUsers(users) {
        // aqui traduz o tipo conforme as constantes
        users.map((user) => {
            user.tipo = user.tipo == this.ADM ? 'Administrador' : 'Padrão';

            return user;
        });;
    }

    /**
     * Aplica regras em um usuário
     * @param {json} user - Objeto com as informações do usuário.
     * @returns {void}
     */
    static getOneUser(user) {
        if (!user) {
            throw new CustomError('Usuário não encontrado!', 500);
        }
    }

    /**
     * Aplica regras em um usuário que será criado
     * @param {json} user - Objeto com as informações do usuário.
     * @return {void}
     */
    static async createUser(user) {
        // verifica se o usuário já existe por e-mail
        const emailExists = await User.findByEmail(user.email);

        if (emailExists) {
            throw new CustomError('O e-mail informado já está em uso!', 500);
        }

        // realiza validações no Tipo
        this.validateUserType(user);

        // seria interessante colocar regra para validar senha com números, letras maiúsculas e minúsuclas e símbolos
    }

    /**
     * Aplica regras em um usuário que será atualizado
     * @param {number} id - Id do usuário a ser atualizado.
     * @param {json} user - Objeto com os novos dados do usuário.
     * @returns {void}
     */
    static async updateUser(id, user) {
        // verifica se o usuário já existe por e-mail e por cpf
        const userWithEmail = await User.findByEmail(user.email);

        if (userWithEmail && userWithEmail.id != id) {
            throw new CustomError('O e-mail informado já está em uso!', 500);
        }

        // realiza validações no Tipo
        this.validateUserType(user);
    }

    /**
     * Aplica regras em um usuário que será deletado
     * @param {number} id - Id do usuário a ser excluído.
     * @param {number} loggedUserId - Id do usuário logado.
     * @returns {void}
     */
    static deleteUser(id, loggedUserId) {
        // aqui impede que o usuário se exclua, fazendo com que sempre haja um usuário
        if (id == loggedUserId) {
            throw new CustomError('Não é permitido excluir o próprio usuário!', 500);
        }
    }
}

export default UserServices;
