import dayjs from 'dayjs';
import CustomError from '../helpers/customError.js';

/**
 * @classdesc Classe com as funções que aplicam regras de negócio nas operações de eventos
 */
class EventServices {
    /**
     * Faz validações nas datas informadas
     * @param {dateString} dataInicio data de início.
     * @param {dateString} dataTermino data de término.
     */
    static validateDates(dataInicio, dataTermino) {
        if (!dataInicio || !dataTermino) {
            throw new CustomError('É preciso informar a data de início e término do evento!', 500);
        }

        const data1 = new Date(dataInicio);
        const data2 = new Date(dataTermino);

        if (data1.getTime() > data2.getTime()) {
            throw new CustomError('A data de início não pode ser maior que a data de término!', 500);
        }
    }

    /**
     * Aplica regras em todos os eventos informados
     * @param {array} events Lista de eventos.
     * @returns {void}
     */
    static async getAllEvents(events) {
        events.map((event) => {
            event.data_hora_inicio = dayjs(event.dataHoraInicio).format('DD/MM/YYYY HH:mm:ss');
            event.data_hora_fim = dayjs(event.dataHoraFim).format('DD/MM/YYYY HH:mm:ss');
        });
    }

    /**
     * Aplica regras em um evento
     * @param {json} event - Objeto com as informações do evento.
     * @returns {void}
     */
    static async getOneEvent(event) {
        // formata a data para o formato padrão pois vem no formato ISO
        event.data_hora_inicio = dayjs(event.dataHoraInicio).format('YYYY-MM-DD HH:mm:ss');
        event.data_hora_fim = dayjs(event.dataHoraFim).format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     * Aplica regras em um evento que será criado
     * @param {json} event - Objeto com as informações do evento.
     * @return {void}
     */
    static async createEvent(event) {
        // valida as datas informadas
        this.validateDates(event.data_hora_inicio, event.data_hora_fim);

        // coloca no formato ISO8601
        event.data_hora_inicio = dayjs(event.data_hora_inicio).format();
        event.data_hora_fim = dayjs(event.data_hora_fim).format();
    }

    /**
     * Aplica regras em um evento que será atualizado
     * @param {json} event - Objeto com os novos dados do evento.
     * @returns {void}
     */
    static async updateEvent(event) {
        // valida as datas informadas
        this.validateDates(event.data_hora_inicio, event.data_hora_fim);

        // coloca no formato ISO8601
        event.data_hora_inicio = dayjs(event.data_hora_inicio).format();
        event.data_hora_fim = dayjs(event.data_hora_fim).format();
    }

    /**
     * Aplica regras em um evento que será deletado
     * @returns {void}
     */
    static async deleteEvent() {}
}

export default EventServices;
