import VolunteerEvent from "../models/VolunteerEvent.js";
import Volunteer from "../models/Volunteer.js";

/**
 * @classdesc Classe com as funções que aplicam regras de negócio nas operações de voluntários
 */
class VolunteerServices
{
    /**
     * Busca todos os voluntários aplicando regras
     * @returns {array} Lista de voluntários.
     */
    static async getAllVolunteers() {
        return await Volunteer.findAll();
    }

    /**
     * Busca um voluntário por id aplicando regras
     * @param {number} id - O id do voluntário.
     * @returns {json} O objeto do voluntário.
     */
    static async getOneVolunteer(id) {
        const volunteers = await Volunteer.find(id);

        if (volunteers.length != 1) {
            throw new Error('Voluntário não encontrado!');
        }

        const volunteer = volunteers[0];

        return volunteer;
    }

    /**
     * Insere um novo voluntário aplicando regras.
     * @param {json} volunteer - Objeto com as informações do voluntário.
     * @return {number} O id do novo voluntário.
     */
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

    /**
     * Insere uma nova relação entre voluntário e evento aplicando regras.
     * @param {json} volunteerEvent - Objeto com as informações do voluntário e evento.
     * @return {number} O id da nova relação entre voluntário e evento.
     */
    static async addInEvent(volunteerEvent) {
        const volunteerEventExists = await VolunteerEvent.findVolunteerByEvent(volunteerEvent);

        if (volunteerEventExists) {
            throw new Error("Voluntário já cadastrado nesse evento!");
        }

        return await VolunteerEvent.create(volunteerEvent);
    }
    
    /**
     * Atualiza os dados de um voluntário aplicando regras.
     * @param {number} id - Id do voluntário a ser atualizado.
     * @param {json} volunteer - Objeto com os novos dados do voluntário.
     * @returns {json} Rows afetadas.
     */
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
    
    /**
     * Deleta os dados de um voluntário aplicando regras.
     * @param {number} id - Id do voluntário.
     * @returns {json} Rows afetadas.
     */
    static async deleteVolunteer(id) {
        const deletedRows = await Volunteer.delete(id);

        if (deletedRows === 0) {
            throw new Error("Voluntário não encontrado!");
        }

        return deletedRows;
    }
}

export default VolunteerServices;