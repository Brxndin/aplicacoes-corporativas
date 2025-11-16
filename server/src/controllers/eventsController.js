import eventInterface from '../interfaces/eventInterface.js';
import Event from '../models/Event.js';
import EventServices from '../services/eventServices.js';

/**
 * @classdesc Classe com as funções que recebem requisições, tratam os dados, chamam funções de services (regras de negócio) e salvam alterações no banco de dados de eventos
 */
class EventsController {
    /**
     * Busca uma lista com todos os eventos.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {array} Array de objetos de eventos.
     */
    static async getAll(req, res, next) {
        try {
            const events = await Event.findAll();

            EventServices.getAllEvents(events);

            res.json(events);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Busca uma lista com todos os próximos eventos.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {array} Array de objetos de eventos.
     */
    static async getAllNext(req, res, next) {
        try {
            const events = await Event.findAllNext();

            EventServices.getAllEvents(events);

            res.json(events);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Busca um evento específico por ID.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto de evento.
     */
    static async getOne(req, res, next) {
        try {
            const id = parseInt(req.params.id);

            const event = await Event.find(id);

            EventServices.getOneEvent(event);

            res.json(event);
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Insere um novo evento e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros, mensagens e id.
     */
    static async create(req, res, next) {
        try {
            // aqui trata os dados do voluntário com sua interface padrão
            const event = eventInterface.treatData(req.body);

            EventServices.createEvent(event);

            const id = await Event.create(event);

            res.status(201).json({ message: 'Evento criado com sucesso!', id });
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Atualiza um evento específico e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros e mensagens.
     */
    static async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);

            // aqui trata os dados do voluntário com sua interface padrão
            const event = eventInterface.treatData(req.body);

            EventServices.updateEvent(event);

            const updatedRows = await Event.update(id, event);

            if (!updatedRows) {
                throw new CustomError('Evento não encontrado!', 500);
            }

            res.json({ message: 'Evento atualizado com sucesso!' });
        } catch (error) {
            next(error);
        }
    }
    
    /**
     * Remove um evento específico e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros e mensagens.
     */
    static async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            
            EventServices.deleteEvent(id);

            const deletedRows = await Event.delete(id);

            if (!deletedRows) {
                // verificar a possibilidade de aplicar essa validação no service
                throw new CustomError('Evento não encontrado!', 500);
            }

            res.json({ message: 'Evento deletado com sucesso!' });
        } catch (error) {
            next(error);
        }
    }
}

export default EventsController;