import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import usersRoutes from './routes/usersRoutes.js';
import authRoutes from './routes/authRoutes.js';
import eventsRoutes from './routes/eventsRoutes.js';
import volunteersRoutes from './routes/volunteersRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import verifyJWT from './middlewares/verifyJWT.js';

// cria o app com express e configura
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// rotas da api
app.use('/auth', authRoutes);
app.use('/users', verifyJWT, usersRoutes);
app.use('/events', verifyJWT, eventsRoutes);
app.use('/volunteers', verifyJWT, volunteersRoutes);
app.use('/dashboard', verifyJWT, dashboardRoutes);

// // middlewares para tratamento de erros
// app.use(errorMiddleware);

export default app;