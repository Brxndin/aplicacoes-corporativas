import VolunteerServices from '../services/volunteerServices';

class VolunteersController {
    static async getAll(req, res) {
        try {
            const volunteers = await VolunteerServices.getAllVolunteers();

            res.json(volunteers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
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
    
    static async update(req, res) {
        try {
            // melhor criar validações melhores aqui pois no req.body pode vir qualquer coisa
            // importante validar se os campos usados existem de fato

            const id = req.params.id;

            await VolunteerServices.updateVolunteer(id, req.body);

            res.json({ message: 'Voluntário atualizado com sucesso.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    static async delete(req, res) {
        try {
            const id = req.params.id;
            
            await VolunteerServices.deleteVolunteer(id);

            res.json({ message: 'Voluntário deletado com sucesso.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default VolunteersController;