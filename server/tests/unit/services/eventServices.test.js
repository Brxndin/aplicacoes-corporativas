import dayjs from 'dayjs';
import EventServices from '../../../src/services/eventServices.js';
import { describe, test, expect } from '@jest/globals'

test('Deve validar que uma das datas não foi informada e jogar erro', () => {
    const dataInicio = dayjs('2025-11-10').format();
    const dataFim = null;

    expect(() => EventServices.validateDates(dataInicio, dataFim)).toThrow('É preciso informar a data de início e término do evento!');
});

test('Deve validar que a data de início é maior que a de fim e jogar erro', () => {
    const dataInicio = dayjs('2025-11-10').format();
    const dataFim = dayjs('2025-09-01').format();

    expect(() => EventServices.validateDates(dataInicio, dataFim)).toThrow('A data de início não pode ser maior que a data de término!');
});

test('Deve validar se as datas estão sendo formatadas corretamente do formato ISO8601 para o formato Y-m-d H:i:s padrão', () => {
    const event = {
        dataHoraInicio: dayjs('2025-11-01 03:00:00').format(),
        dataHoraFim: dayjs('2025-11-02 02:59:00').format(),
    };

    EventServices.getOneEvent(event);

    expect(event.data_hora_inicio).toBe('2025-11-01 03:00:00');
    expect(event.data_hora_fim).toBe('2025-11-02 02:59:00');
});
