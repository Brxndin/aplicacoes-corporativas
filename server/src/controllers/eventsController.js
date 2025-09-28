import EventServices from '../services/eventServices';

class EventsController {
    static async getAll(req, res) {
        try {
            const events = await EventServices.getAllEvents();

            res.json(events);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async create(req, res) {
        try {
            // melhor criar validações melhores aqui pois no req.body pode vir qualquer coisa
            // importante validar se os campos usados existem de fato

            const id = await EventServices.createEvent(req.body);

            res.status(201).json({ message: 'Evento criado com sucesso.', id });
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

            res.json({ message: 'Evento atualizado com sucesso.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async delete(req, res) {
        try {
            const id = req.params.id;
            
            await EventServices.deleteEvent(id);

            res.json({ message: 'Evento deletado com sucesso.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default EventsController;