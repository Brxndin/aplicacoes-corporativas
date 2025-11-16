import VolunteerEvent from '../models/VolunteerEvent.js';
import Volunteer from '../models/Volunteer.js';
import CustomError from '../helpers/customError.js';

/**
 * @classdesc Classe com as funções que aplicam regras de negócio nas operações de voluntários
 */
class VolunteerServices {
    /**
     * Aplica regras em todos os voluntários informados
     * @returns {void}
     */
    static getAllVolunteers() {}

    /**
     * Aplica regras em um voluntário
     * @param {json} volunteer - Objeto com as informações do usuário.
     * @returns {void}
     */
    static getOneVolunteer(volunteer) {
        if (!volunteer) {
            throw new CustomError('Voluntário não encontrado!', 500);
        }
    }

    /**
     * Aplica regras em um voluntário que será criado
     * @param {json} volunteer - Objeto com as informações do voluntário.
     * @return {void}
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
    }

    /**
     * Aplica regras em uma nova relação entre voluntário e evento que será criada
     * @param {json} volunteerEvent - Objeto com as informações do voluntário e evento.
     * @return {void}
     */
    static async addInEvent(volunteerEvent) {
        const volunteerEventExists = await VolunteerEvent.findVolunteerByEvent(volunteerEvent);

        if (volunteerEventExists) {
            throw new CustomError('Voluntário já cadastrado nesse evento!', 500);
        }
    }

    /**
     * Aplica regras em um voluntário que será atualizado
     * @param {number} id - Id do voluntário a ser atualizado.
     * @param {json} volunteer - Objeto com os novos dados do voluntário.
     * @returns {void}
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
    }

    /**
     * Aplica regras em um voluntário que será deletado
     * @returns {void}
     */
    static deleteVolunteer() {}
}

export default VolunteerServices;
