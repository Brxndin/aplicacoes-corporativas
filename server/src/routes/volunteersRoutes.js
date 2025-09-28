const express = require('express');

const VolunteersController = require('../controllers/volunteersController');

const router = express.Router();

router.get('/', VolunteersController.getAll);
router.post('/', VolunteersController.create);
router.put('/:id', VolunteersController.update);
router.delete('/:id', VolunteersController.delete);

export default router;