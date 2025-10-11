import userInterface from '../interfaces/userInterface.js';
import AuthServices from '../services/authServices.js';

/**
 * @classdesc Classe com funções que recebem requisições, tratam os dados e chamamm funções de services (regras de negócio) de autenticação
 */
class AuthController {
    /**
     * Valida e-mail e senha informados e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros, mensagens, token, etc.
     */
    static async login(req, res) {
        try {
            // aqui trata os dados do usuário com sua interface padrão
            const userData = userInterface.treatData(req.body);

            const { payload, token } = await AuthServices.verifyPassword(userData);

            res.status(200).json({
                message: 'Login efetuado com sucesso!',
                auth: true,
                user: payload,
                token: token
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
                error: error.message,
                auth: false
            });
        }
    }
}

export default AuthController;