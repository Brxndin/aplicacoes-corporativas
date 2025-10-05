import Event from "../models/Event.js";

class EventServices
{
    static async getAllEvents() {
        return await Event.findAll();
    }

    static async getOneEvent(id) {
        const events = await Event.find(id);

        if (events.length != 1) {
            throw new Error('Evento não encontrado!');
        }

        const event = events[0];

        return event;
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