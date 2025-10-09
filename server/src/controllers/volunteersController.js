import VolunteerServices from '../services/volunteerServices.js';

/**
 * @classdesc Classe com as funções que recebem requisições, tratam os dados e chamam funções de services (regras de negócio) de voluntários
 */
class VolunteersController {
    /**
     * Busca uma lista com todos os voluntários.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {array} Array de objetos de voluntários.
     */
    static async getAll(req, res) {
        try {
            const volunteers = await VolunteerServices.getAllVolunteers();

            res.json(volunteers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Busca um voluntário específico por ID.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto de voluntário.
     */
    static async getOne(req, res) {
        try {
            const id = req.params.id;

            const volunteer = await VolunteerServices.getOneVolunteer(id);

            res.json(volunteer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    /**
     * Insere um novo voluntário e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros, mensagens e id.
     */
    static async create(req, res) {
        try {
            // melhor criar validações melhores aqui pois no req.body pode vir qualquer coisa
            // importante validar se os campos usados existem de fato

            const id = await VolunteerServices.createVolunteer(req.body);

            res.status(201).json({ message: 'Voluntário criado com sucesso!', id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Insere um voluntário em um evento e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros, mensagens e id.
     */
    static async addInEvent(req, res) {
        try {
            // melhor criar validações melhores aqui pois no req.body pode vir qualquer coisa
            // importante validar se os campos usados existem de fato

            const id = await VolunteerServices.addInEvent(req.body);

            res.status(201).json({ message: 'Voluntário adicionado no evento com sucesso!', id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    /**
     * Atualiza um voluntário específico e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros e mensagens.
     */
    static async update(req, res) {
        try {
            // melhor criar validações melhores aqui pois no req.body pode vir qualquer coisa
            // importante validar se os campos usados existem de fato

            const id = req.params.id;

            await VolunteerServices.updateVolunteer(id, req.body);

            res.json({ message: 'Voluntário atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    /**
     * Remove um voluntário específico e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros e mensagens.
     */
    static async delete(req, res) {
        try {
            const id = req.params.id;
            
            await VolunteerServices.deleteVolunteer(id);

            res.json({ message: 'Voluntário deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default VolunteersController;