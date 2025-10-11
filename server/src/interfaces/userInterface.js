import defaultInterface from './defaultInterface.js';

class userInterface extends defaultInterface
{
    static fillable = [
        'id',
        'nome',
        'email',
        'tipo',
        'senha',
    ];

    static treatData(data)
    {
        const dadosTratados = this.fill(this.fillable, data);

        return dadosTratados;
    }
}

export default userInterface;