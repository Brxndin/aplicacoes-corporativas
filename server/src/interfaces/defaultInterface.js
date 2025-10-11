class defaultInterface
{
    static fill(fillable, data)
    {
        const dadosTratados = {};

        fillable.map((value) => {
            dadosTratados[value] = data?.[value] ?? null;
        });

        return dadosTratados;
    }
}

export default defaultInterface;