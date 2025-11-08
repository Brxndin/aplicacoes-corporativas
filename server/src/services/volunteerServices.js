import VolunteerEvent from '../models/VolunteerEvent.js';
import Volunteer from '../models/Volunteer.js';
import CustomError from '../helpers/customError.js';

/**
 * @classdesc Classe com as funções que aplicam regras de negócio nas operações de voluntários
 */
class VolunteerServices {
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
            throw new CustomError('Voluntário não encontrado!', 500);
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
            throw new CustomError('O e-mail informado já está em uso!', 500);
        }

        const cpfExists = await Volunteer.findByCPF(volunteer.cpf);

        if (cpfExists) {
            throw new CustomError('O CPF informado já está em uso!', 500);
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
            throw new CustomError('Voluntário já cadastrado nesse evento!', 500);
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
            throw new CustomError('O e-mail informado já está em uso!', 500);
        }

        const volunteerWithCpf = await Volunteer.findByCPF(volunteer.cpf);

        if (volunteerWithCpf && volunteerWithCpf.id != id) {
            throw new CustomError('O CPF informado já está em uso!', 500);
        }

        const updatedRows = await Volunteer.update(id, volunteer);

        if (updatedRows === 0) {
            throw new CustomError('Voluntário não encontrado!', 500);
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
            throw new CustomError('Voluntário não encontrado!', 500);
        }

        return deletedRows;
    }
}

export default VolunteerServices;
