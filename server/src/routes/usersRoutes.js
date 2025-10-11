import express from 'express';
import UsersController from '../controllers/usersController.js';
import verifyAdmin from '../middlewares/verifyAdmin.js';

const router = express.Router();

router.get('/', UsersController.getAll);
router.get('/:id', UsersController.getOne);
router.post('/', verifyAdmin, UsersController.create);
router.put('/:id', verifyAdmin, UsersController.update);
router.delete('/:id', verifyAdmin, UsersController.delete);

export default router;