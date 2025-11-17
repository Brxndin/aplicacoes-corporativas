import 'dotenv/config';
import { app, logger } from './src/app.js';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

// lembrar de fazer a configuração para uma build mais leve usando o webpack ou esbuild e afins

// inicia o servidor
app.listen(PORT, () => {
    logger.info(`Servidor rodando em: http://${HOST}:${PORT}`);
    logger.info(`Documentação da API: http://${HOST}:${PORT}/api-docs`);
});
