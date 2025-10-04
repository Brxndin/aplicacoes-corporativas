import AuthServices from '../services/authServices.js';

class AuthController {
    static async login(req, res) {
        try {
            // melhor criar validações melhores aqui pois no req.body pode vir qualquer coisa
            // importante validar se os campos usados existem de fato

            const user = await AuthServices.verifyPassword(req.body);

            res.status(200).json({
                message: 'Login efetuado com sucesso!',
            });
        } catch (error) {
            res.status(500).json({
                message: 'Ocorreu um erro!',
                error: error.message
            });
        }
    }
}

export default AuthController;