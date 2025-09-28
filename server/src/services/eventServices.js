import Event from "../models/Event";

class EventServices
{
    static async getAllEvents() {
        return await Event.findAll();
    }

    static async createEvent(event) {
        // verificar qual regra de negócio aplicar
        // const eventExists = await Event.findByEmail(user.email);

        // if (eventExists) {
        //     throw new Error("Evento já cadastrado!");
        // }

        return await Event.create(event);
    }
    
    static async updateEvent(id, event) {
        const updatedRows = await Event.update(id, event);

        if (updatedRows === 0) {
            throw new Error("Evento não encontrado!");
        }

        return updatedRows;
    }
    
    static async deleteUser(id) {
        const deletedRows = await Event.delete(id);

        if (deletedRows === 0) {
            throw new Error("Evento não encontrado!");
        }

        return deletedRows;
    }
}

export default EventServices;