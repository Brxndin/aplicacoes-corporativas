import volunteerEventInterface from '../interfaces/volunteerEventInterface.js';
import volunteerInterface from '../interfaces/volunteerInterface.js';
import Volunteer from '../models/Volunteer.js';
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
    static async getAll(req, res, next) {
        try {
            const volunteers = await Volunteer.findAll();

            res.json(volunteers);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Busca um voluntário específico por ID.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto de voluntário.
     */
    static async getOne(req, res, next) {
        try {
            const id = parseInt(req.params.id);

            const volunteer = await Volunteer.find(id);

            VolunteerServices.getOneVolunteer(volunteer);

            res.json(volunteer);
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Insere um novo voluntário e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros, mensagens e id.
     */
    static async create(req, res, next) {
        try {
            // aqui trata os dados do voluntário com sua interface padrão
            const volunteer = volunteerInterface.treatData(req.body);

            await VolunteerServices.createVolunteer(volunteer);

            const id = await Volunteer.create(volunteer);

            res.status(201).json({ message: 'Voluntário criado com sucesso!', id });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Insere um voluntário em um evento e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros, mensagens e id.
     */
    static async addInEvent(req, res, next) {
        try {
            // aqui trata os dados da relação de voluntário e evento com sua interface padrão
            const volunteerEvent = volunteerEventInterface.treatData(req.body);

            await VolunteerServices.addInEvent(volunteerEvent);
            
            const id = await VolunteerEvent.create(volunteerEvent); 

            res.status(201).json({ message: 'Voluntário adicionado no evento com sucesso!', id });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Atualiza um voluntário específico e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros e mensagens.
     */
    static async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);

            // aqui trata os dados do voluntário com sua interface padrão
            const volunteer = volunteerInterface.treatData(req.body);

            await VolunteerServices.updateVolunteer(id, volunteer);

            const updatedRows = await Volunteer.update(id, volunteer);

            if (!updatedRows) {
                throw new CustomError('Voluntário não encontrado!', 500);
            }

            res.json({ message: 'Voluntário atualizado com sucesso!' });
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Remove um voluntário específico e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros e mensagens.
     */
    static async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            
            await VolunteerServices.deleteVolunteer();

            const deletedRows = await Volunteer.delete(id);

            if (!deletedRows) {
                throw new CustomError('Voluntário não encontrado!', 500);
            }

            res.json({ message: 'Voluntário deletado com sucesso!' });
        } catch (error) {
            next(error);
        }
    }
}

export default VolunteersController;