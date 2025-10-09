import 'dotenv/config';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Eventos Pindorama',
      version: '1.0.0',
      description: 'Documentação da API REST para gerenciamento de eventos, voluntários e usuários.'
    },
    servers: [
      {
        url: `http://${process.env.HOST}:${process.env.PORT}`,
      },
    ],
  },
  // arquivos com comentários JSDoc e swagger
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;