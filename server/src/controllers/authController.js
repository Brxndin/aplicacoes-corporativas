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
            // melhor criar validações melhores aqui pois no req.body pode vir qualquer coisa
            // importante validar se os campos usados existem de fato

            const { payload, token } = await AuthServices.verifyPassword(req.body);

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