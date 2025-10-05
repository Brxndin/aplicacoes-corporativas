import express from 'express';
import EventsController from '../controllers/eventsController.js';

const router = express.Router();

router.get('/', EventsController.getAll);
router.get('/:id', EventsController.getOne);
router.post('/', EventsController.create);
router.put('/:id', EventsController.update);
router.delete('/:id', EventsController.delete);

export default router;