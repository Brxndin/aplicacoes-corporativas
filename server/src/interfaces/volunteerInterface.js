import defaultInterface from './defaultInterface.js';

class volunteerInterface extends defaultInterface
{
    static fillable = [
        'id',
        'cpf',
        'nome',
        'email',
        'telefone'
    ];

    static treatData(data)
    {
        const dadosTratados = this.fill(this.fillable, data);

        return dadosTratados;
    }
}

export default volunteerInterface;