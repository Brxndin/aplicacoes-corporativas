import Event from "../models/Event.js";

/**
 * @classdesc Classe com as funções que aplicam regras de negócio nas operações de eventos
 */
class EventServices
{
    /**
     * Formata a data enviada para o padrão Y-m-d H:i:s
     * @returns {dateString} Data formatada.
     */
    static formatDateTime(dateString) {
        const newDate = new Date(dateString);

        return `${newDate.toLocaleDateString('pt-BR')} ${newDate.toLocaleTimeString('pt-BR')}`;
    }

    /**
     * Busca todos os eventos aplicando regras
     * @returns {array} Lista de eventos.
     */
    static async getAllEvents() {
        const events =  await Event.findAll();

        events.map((event) => {
            event.data_hora_inicio = this.formatDateTime(event.data_hora_inicio);
            event.data_hora_fim = this.formatDateTime(event.data_hora_fim);
        });

        return events;
    }

    /**
     * Busca um evento por id aplicando regras
     * @param {number} id - O id do evento.
     * @returns {json} O objeto do evento.
     */
    static async getOneEvent(id) {
        const events = await Event.find(id);

        if (events.length != 1) {
            throw new Error('Evento não encontrado!');
        }

        const event = events[0];

        return event;
    }

    /**
     * Insere um novo evento aplicando regras.
     * @param {json} event - Objeto com as informações do evento.
     * @return {number} O id do novo evento.
     */
    static async createEvent(event) {
        // verificar qual regra de negócio aplicar

        return await Event.create(event);
    }
    
    /**
     * Atualiza os dados de um evento aplicando regras.
     * @param {number} id - Id do evento a ser atualizado.
     * @param {json} event - Objeto com os novos dados do evento.
     * @returns {json} Rows afetadas.
     */
    static async updateEvent(id, event) {
        const updatedRows = await Event.update(id, event);

        if (updatedRows === 0) {
            throw new Error("Evento não encontrado!");
        }

        return updatedRows;
    }
    
    /**
     * Deleta os dados de um evento aplicando regras.
     * @param {number} id - Id do evento.
     * @returns {json} Rows afetadas.
     */
    static async deleteUser(id) {
        const deletedRows = await Event.delete(id);

        if (deletedRows === 0) {
            throw new Error("Evento não encontrado!");
        }

        return deletedRows;
    }
}

export default EventServices;