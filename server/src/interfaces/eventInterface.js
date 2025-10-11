import defaultInterface from './defaultInterface.js';

class eventInterface extends defaultInterface
{
    static fillable = [
        'id',
        'nome',
        'descricao',
        'data_hora_inicio',
        'data_hora_fim',
    ];

    static treatData(data)
    {
        const dadosTratados = this.fill(this.fillable, data);

        return dadosTratados;
    }
}

export default eventInterface;