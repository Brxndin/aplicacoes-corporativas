import CustomError from '../helpers/customError.js';
import userInterface from '../interfaces/userInterface.js';
import User from '../models/User.js';
import UserServices from '../services/userServices.js';

/**
 * @classdesc Classe com as funções que recebem requisições, tratam os dados, chamam funções de services (regras de negócio) e salvam alterações no banco de dados de usuários
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
            const users = await User.findAll();

            // aplica regras
            UserServices.getAllUsers(users);

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

            const user = await User.find(id);

            // aplica regras
            UserServices.getOneUser(user);

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
            const user = userInterface.treatData(req.body);

            // aplica regras
            await UserServices.createUser(user);

            const id = await User.create(user);

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
            const user = userInterface.treatData(req.body);

            // aplica regras
            await UserServices.updateUser(id, user);

            const updatedRows = await User.update(id, user);

            if (!updatedRows) {
                // verificar a possibilidade de aplicar essa validação no service
                throw new CustomError('Usuário não encontrado!', 500);
            }

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

            const loggedUserId = parseInt(req.userPayload?.id);
            
            UserServices.deleteUser(id, loggedUserId);

            const deletedRows = await User.delete(id);

            if (!deletedRows) {
                // verificar possibilidade de aplicar essa validação no service
                throw new CustomError('Usuário não encontrado!', 500);
            }

            res.json({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            next(error);
        }
    }
}

export default UsersController;