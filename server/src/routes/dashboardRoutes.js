import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        text: 'Esse texto vem diretamente da API!'
    });
});

export default router;