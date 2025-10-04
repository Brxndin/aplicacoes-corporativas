import 'dotenv/config';

import app from './src/app.js';
const PORT = process.env.PORT || 3000;

// inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});