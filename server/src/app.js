import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import logger from './config/winston.js';
import errorHandler from './middlewares/errorHandler.js';
import requestLogger from './middlewares/requestLogger.js';
import verifyJWT from './middlewares/verifyJWT.js';
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import eventsRoutes from './routes/eventsRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import volunteersRoutes from './routes/volunteersRoutes.js';

// cria o app com express e configura
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// middleware para logging
app.use(requestLogger);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', requestId: req.requestId });
});

// rota da documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// rotas da api
app.use('/auth', authRoutes);
app.use('/home', homeRoutes);
app.use('/users', verifyJWT, usersRoutes);
app.use('/events', verifyJWT, eventsRoutes);
app.use('/volunteers', verifyJWT, volunteersRoutes);
app.use('/dashboard', verifyJWT, dashboardRoutes);

// middleware para tratamento de erros
app.use(errorHandler);

export { app, logger };
