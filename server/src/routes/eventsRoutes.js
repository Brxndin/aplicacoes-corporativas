const express = require('express');

const EventsController = require('../controllers/eventsController');

const router = express.Router();

router.get('/', EventsController.getAll);
router.post('/', EventsController.create);
router.put('/:id', EventsController.update);
router.delete('/:id', EventsController.delete);

export default router;