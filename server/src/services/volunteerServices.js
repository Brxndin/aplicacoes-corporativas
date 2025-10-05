import VolunteerEvent from "../models/VolunteerEvent.js";
import Volunteer from "../models/Volunteer.js";

class VolunteerServices
{
    static async getAllVolunteers() {
        return await Volunteer.findAll();
    }

    static async getOneVolunteer(id) {
        const volunteers = await Volunteer.find(id);

        if (volunteers.length != 1) {
            throw new Error('Voluntário não encontrado!');
        }

        const volunteer = volunteers[0];

        return volunteer;
    }

    static async createVolunteer(volunteer) {
        // verifica se o voluntário já existe por e-mail e por cpf
        const emailExists = await Volunteer.findByEmail(volunteer.email);

        if (emailExists) {
            throw new Error("O e-mail informado já está em uso!");
        }

        const cpfExists = await Volunteer.findByCPF(volunteer.cpf);

        if (cpfExists) {
            throw new Error("O CPF informado já está em uso!");
        }

        return await Volunteer.create(volunteer);
    }

    static async addInEvent(volunteerEvent) {
        const volunteerEventExists = await VolunteerEvent.findVolunteerByEvent(volunteerEvent);

        if (volunteerEventExists) {
            throw new Error("Voluntário já cadastrado nesse evento!");
        }

        return await VolunteerEvent.create(volunteerEvent);
    }
    
    static async updateVolunteer(id, volunteer) {
        // verifica se o voluntário já existe por e-mail e por cpf
        const volunteerWithEmail = await Volunteer.findByEmail(volunteer.email);

        if (volunteerWithEmail && volunteerWithEmail.id != id) {
            throw new Error("O e-mail informado já está em uso!");
        }

        const volunteerWithCpf = await Volunteer.findByCPF(volunteer.cpf);

        if (volunteerWithCpf && volunteerWithCpf.id != id) {
            throw new Error("O CPF informado já está em uso!");
        }

        const updatedRows = await Volunteer.update(id, volunteer);

        if (updatedRows === 0) {
            throw new Error("Voluntário não encontrado!");
        }

        return updatedRows;
    }
    
    static async deleteVolunteer(id) {
        const deletedRows = await Volunteer.delete(id);

        if (deletedRows === 0) {
            throw new Error("Voluntário não encontrado!");
        }

        return deletedRows;
    }
}

export default VolunteerServices;