import userInterface from '../interfaces/userInterface.js';
import AuthServices from '../services/authServices.js';

/**
 * @classdesc Classe com funções que recebem requisições, tratam os dados e chamamm funções de services (regras de negócio) de autenticação
 */
class AuthController {
    /**
     * Valida e-mail e senha informados, gera token e retorna dados.
     * @param {Request} req Objeto da Request.
     * @param {Response} res Objeto da Response.
     * @returns {json} Objeto com dados usados pelo front-end, como erros, mensagens, token, etc.
     */
    static async login(req, res, next) {
        try {
            // aqui trata os dados do usuário com sua interface padrão
            const user = userInterface.treatData(req.body);

            await AuthServices.verifyPassword(user);

            // aqui chamo de payload mas é o que vai ser transformado em token
            const payload = {
                id: usuario.id,
                name: usuario.nome,
                role: usuario.tipo,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.status(200).json({
                message: 'Login efetuado com sucesso!',
                auth: true,
                user: payload,
                token: token
            });
        } catch (error) {
            error.auth = false;

            next(error);
        }
    }
}

export default AuthController;