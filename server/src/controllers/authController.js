import AuthServices from '../services/authServices.js';

class AuthController {
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