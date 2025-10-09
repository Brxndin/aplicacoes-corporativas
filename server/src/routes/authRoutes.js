import express from 'express';

import AuthController from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *      - Authenticator
 * name: Authenticator
 * description: Gerenciamento de login e autenticação
 */

/**
 * @swagger
 * /auth/login:
 * post:
 *      summary: Realizar o login do usuário
 *      tags:
 *            - Authenticator
 *      responses:
 *          201:
 *              description: Login realizado com sucesso.
 *          500:
 *              description: Erro ao realizar o login.
 */
router.post('/login', AuthController.login);

export default router;