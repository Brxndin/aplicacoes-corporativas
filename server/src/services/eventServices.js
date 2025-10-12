import Event from "../models/Event.js";
import dayjs from "dayjs";

/**
 * @classdesc Classe com as funções que aplicam regras de negócio nas operações de eventos
 */
class EventServices
{
    /**
     * Faz validações nas datas informadas
     * @param {dateString} dataInicio data de início.
     * @param {dateString} dataTermino data de término.
     */
    static validateDates(dataInicio, dataTermino) {
        if (!dataInicio || !dataTermino) {
            throw new Error('É preciso informar a data de início e término do evento!');
        }
        
        const data1 = new Date(dataInicio);
        const data2 = new Date(dataTermino);

        if (data1.getTime() > data2.getTime()) {
            throw new Error('A data de início não pode ser maior que a data de término!');
        }
    }

    /**
     * Busca todos os eventos aplicando regras
     * @returns {array} Lista de eventos.
     */
    static async getAllEvents() {
        const events =  await Event.findAll();

        events.map((event) => {
            event.data_hora_inicio = dayjs(event.data_hora_inicio).format('DD/MM/YYYY HH:mm:ss');
            event.data_hora_fim = dayjs(event.data_hora_fim).format('DD/MM/YYYY HH:mm:ss');
        });

        return events;
    }

    /**
     * Busca todos os próximos eventos aplicando regras
     * @returns {array} Lista de eventos.
     */
    static async getAllNextEvents() {
        const events =  await Event.findAllNext();

        events.map((event) => {
            event.data_hora_inicio = dayjs(event.data_hora_inicio).format('DD/MM/YYYY HH:mm:ss');
            event.data_hora_fim = dayjs(event.data_hora_fim).format('DD/MM/YYYY HH:mm:ss');
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

        // formata a data para o formato padrão pois vem no formato ISO
        event.data_hora_inicio = dayjs(event.data_hora_inicio).format('YYYY-MM-DD HH:mm:ss');
        event.data_hora_fim = dayjs(event.data_hora_fim).format('YYYY-MM-DD HH:mm:ss');

        return event;
    }

    /**
     * Insere um novo evento aplicando regras.
     * @param {json} event - Objeto com as informações do evento.
     * @return {number} O id do novo evento.
     */
    static async createEvent(event) {
        // valida as datas informadas
        this.validateDates(event.data_hora_inicio, event.data_hora_fim);

        // formata a data para o formato padrão pois vem no formato ISO
        event.data_hora_inicio = dayjs(event.data_hora_inicio).format('YYYY-MM-DD HH:mm:ss');
        event.data_hora_fim = dayjs(event.data_hora_fim).format('YYYY-MM-DD HH:mm:ss');

        return await Event.create(event);
    }
    
    /**
     * Atualiza os dados de um evento aplicando regras.
     * @param {number} id - Id do evento a ser atualizado.
     * @param {json} event - Objeto com os novos dados do evento.
     * @returns {json} Rows afetadas.
     */
    static async updateEvent(id, event) {
        // valida as datas informadas
        this.validateDates(event.data_hora_inicio, event.data_hora_fim);

        // formata a data para o formato padrão pois vem no formato ISO
        event.data_hora_inicio = dayjs(event.data_hora_inicio).format('YYYY-MM-DD HH:mm:ss');
        event.data_hora_fim = dayjs(event.data_hora_fim).format('YYYY-MM-DD HH:mm:ss');

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