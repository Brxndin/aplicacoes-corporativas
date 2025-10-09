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
    static async getAll(req, res) {
        try {
            const users = await UserServices.getAllUsers();

            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Busca um usuário específico por ID.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto de usuário.
     */
    static async getOne(req, res) {
        try {
            const id = req.params.id;

            const user = await UserServices.getOneUser(id);

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    /**
     * Insere um novo usuário e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros, mensagens e id.
     */
    static async create(req, res) {
        try {
            // melhor criar validações melhores aqui pois no req.body pode vir qualquer coisa
            // importante validar se os campos usados existem de fato

            const id = await UserServices.createUser(req.body);

            res.status(201).json({ message: 'Usuário criado com sucesso!', id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    /**
     * Atualiza um usuário específico e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros e mensagens.
     */
    static async update(req, res) {
        try {
            // melhor criar validações melhores aqui pois no req.body pode vir qualquer coisa
            // importante validar se os campos usados existem de fato

            const id = req.params.id;

            await UserServices.updateUser(id, req.body);

            res.json({ message: 'Usuário atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    /**
     * Remove um usuário específico e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros e mensagens.
     */
    static async delete(req, res) {
        try {
            const id = req.params.id;
            
            await UserServices.deleteUser(id);

            res.json({ message: 'Usuário deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default UsersController;