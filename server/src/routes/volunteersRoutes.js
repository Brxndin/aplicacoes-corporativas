import express from 'express';
import VolunteersController from '../controllers/volunteersController.js';

const router = express.Router();

router.get('/', VolunteersController.getAll);
router.post('/', VolunteersController.create);
router.post('/addInEvent', VolunteersController.addInEvent);
router.put('/:id', VolunteersController.update);
router.delete('/:id', VolunteersController.delete);

export default router;