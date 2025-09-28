require('dotenv').config();

const app = require('./src/app');
const PORT = process.env.PORT || 3000;

// inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});