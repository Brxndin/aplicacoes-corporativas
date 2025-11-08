import CustomError from '../helpers/customError.js';
import userInterface from '../interfaces/userInterface.js';
import UserServices from '../services/userServices.js';

/**
 * @classdesc Classe com as funções que recebem requisições, tratam os dados e chamam funções de services (regras de negócio) de usuários
 */
class UsersController {
    /**
     * Busca uma lista com todos os usuários.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {array} Array de objetos de usuários.
     */
    static async getAll(req, res, next) {
        try {
            const users = await UserServices.getAllUsers();

            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Busca um usuário específico por ID.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto de usuário.
     */
    static async getOne(req, res, next) {
        try {
            const id = parseInt(req.params.id);

            const user = await UserServices.getOneUser(id);

            res.json(user);
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Insere um novo usuário e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros, mensagens e id.
     */
    static async create(req, res, next) {
        try {
            // aqui trata os dados do usuário com sua interface padrão
            const userData = userInterface.treatData(req.body);

            const id = await UserServices.createUser(userData);

            res.status(201).json({ message: 'Usuário criado com sucesso!', id });
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Atualiza um usuário específico e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros e mensagens.
     */
    static async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);

            // aqui trata os dados do usuário com sua interface padrão
            const userData = userInterface.treatData(req.body);

            await UserServices.updateUser(id, userData);

            res.json({ message: 'Usuário atualizado com sucesso!' });
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Remove um usuário específico e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros e mensagens.
     */
    static async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id);

            // aqui impede que o usuário se exclua, fazendo com que sempre haja um usuário
            if (parseInt(req.userPayload?.id) == id) {
                throw new CustomError('Não é permitido excluir o próprio usuário!', 500);
            }
            
            await UserServices.deleteUser(id);

            res.json({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            next(error);
        }
    }
}

export default UsersController;