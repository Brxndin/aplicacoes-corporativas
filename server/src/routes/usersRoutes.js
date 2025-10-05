import express from 'express';
import UsersController from '../controllers/usersController.js';

const router = express.Router();

router.get('/', UsersController.getAll);
router.get('/:id', UsersController.getOne);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);

export default router;