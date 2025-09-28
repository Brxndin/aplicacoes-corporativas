const express = require('express');
const cors = require('cors');
const helmet = require('../node_modules/helmet/index.d.cts');
const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const volunteersRoutes = require('./routes/volunteersRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

// cria o app com express e configura
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

// rotas da api
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/events', eventsRoutes);
app.use('/volunteers', volunteersRoutes);
app.use('/dashboard', dashboardRoutes);

// middlewares para tratamento de erros
app.use(errorMiddleware);

export default app;