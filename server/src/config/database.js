const mysql = require("mysql2/promise");
require("dotenv").config();

// conexão com o mysql
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    // faz a conexão aguardar caso todas as conexões estejam ocupadas
    waitForConnections: true, 
    // limita o número máximo de conexões simultâneas
    connectionLimit: 10, 
    // número máximo de requisições enfileiradas (0 = sem limite)
    queueLimit: 0 
});

module.exports = pool;