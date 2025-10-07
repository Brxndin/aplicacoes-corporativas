import EventServices from '../services/eventServices.js';
import UserServices from '../services/userServices.js';

class EventsController {
    static async getAll(req, res) {
        try {
            const events = await EventServices.getAllEvents();

            res.json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getOne(req, res) {
        try {
            const id = req.params.id;

            const event = await EventServices.getOneEvent(id);

            res.json(event);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async create(req, res) {
        try {
            // aqui valida se o usuário logado é um adm
            if (parseInt(req.userPayload?.role) != UserServices.ADM) {
                throw new Error('Somente administradores podem cadastrar Eventos!');
            }

            // melhor criar validações melhores aqui pois no req.body pode vir qualquer coisa
            // importante validar se os campos usados existem de fato

            const id = await EventServices.createEvent(req.body);

            res.status(201).json({ message: 'Evento criado com sucesso!', id });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async update(req, res) {
        try {
            // melhor criar validações melhores aqui pois no req.body pode vir qualquer coisa
            // importante validar se os campos usados existem de fato

            const id = req.params.id;

            await EventServices.updateEvent(id, req.body);

            res.json({ message: 'Evento atualizado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async delete(req, res) {
        try {
            const id = req.params.id;
            
            await EventServices.deleteEvent(id);

            res.json({ message: 'Evento deletado com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default EventsController;