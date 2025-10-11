import defaultInterface from './defaultInterface.js';

class volunteerEventInterface extends defaultInterface
{
    static fillable = [
        'id',
        'evento_id',
        'voluntario_id'
    ];

    static treatData(data)
    {
        const dadosTratados = this.fill(this.fillable, data);

        return dadosTratados;
    }
}

export default volunteerEventInterface;