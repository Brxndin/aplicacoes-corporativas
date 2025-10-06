import express from 'express';

const router = express.Router();

// verificar o que vai ser o dashboard e como fazê-lo
router.get('/', (req, res) => {
    res.json({
        text: 'Esse texto vem diretamente da API!'
    });
});

export default router;