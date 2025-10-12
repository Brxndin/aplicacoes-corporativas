import express from 'express';
import EventsController from '../controllers/eventsController.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import verifyJWT from '../middlewares/verifyJWT.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *      - Eventos
 * name: Eventos
 * description: Gerenciamento de eventos
 */

/**
 * @swagger
 * /events:
 * get:
 *      summary: Obter todos os eventos
 *      tags:
 *          - Eventos
 *      responses:
 *          200:
 *              description: Todos os eventos encontrados.
 *          500:
 *              description: Erro ao buscar os dados.
 */
router.get('/', EventsController.getAll);
router.get('/:id', EventsController.getOne);

/**
 * @swagger
 * /events:
 * post:
 *      summary: Inserir novo evento
 *      tags:
 *          - Eventos
 *      responses:
 *          201:
 *              description: Evento criado com sucesso.
 *          500:
 *              description: Erro ao cadastrar os dados.
 */
router.post('/', verifyAdmin, EventsController.create);
router.put('/:id', EventsController.update);
router.delete('/:id', EventsController.delete);

export default router;