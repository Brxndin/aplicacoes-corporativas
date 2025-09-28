import VolunteerEvent from "../models/VolunteerEvent";
import Volunteer from "../models/Volunteer";

class VolunteerServices
{
    static async getAllVoluteers() {
        return await Volunteer.findAll();
    }

    static async createVolunteer(volunteer) {
        // verificar qual regra de negócio aplicar
        // const volunteerExists = await Volunteer.findByEmail(volunteer.email);

        // if (volunteerExists) {
        //     throw new Error("Voluntário já cadastrado!");
        // }

        return await Volunteer.create(volunteer);
    }

    static async addInEvent(volunteerEvent) {
        const volunteerEventExists = await Volunteer.findByEvent(volunteerEvent);

        if (volunteerEventExists) {
            throw new Error("Voluntário já cadastrado nesse evento!");
        }

        return await VolunteerEvent.create(volunteerEvent);
    }
    
    static async updateVolunteer(id, volunteer) {
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