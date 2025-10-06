import Event from "../models/Event.js";

class EventServices
{
    static formatDateTime(dateString) {
        const newDate = new Date(dateString);

        return `${newDate.toLocaleDateString('pt-BR')} ${newDate.toLocaleTimeString('pt-BR')}`;
    }

    static async getAllEvents() {
        const events =  await Event.findAll();

        events.map((event) => {
            event.data_hora_inicio = this.formatDateTime(event.data_hora_inicio);
            event.data_hora_fim = this.formatDateTime(event.data_hora_fim);
        });

        return events;
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