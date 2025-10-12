import express from 'express';
import EventsController from '../controllers/eventsController.js';

const router = express.Router();

router.get('/', EventsController.getAllNext);

export default router;