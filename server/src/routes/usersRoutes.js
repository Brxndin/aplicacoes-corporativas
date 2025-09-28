const express = require('express');

const UsersController = require('../controllers/usersController');

const router = express.Router();

router.get('/', UsersController.getAll);
router.post('/', UsersController.create);
router.put('/:id', UsersController.update);
router.delete('/:id', UsersController.delete);

export default router;