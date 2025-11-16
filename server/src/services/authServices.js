import 'dotenv/config';
import CustomError from '../helpers/customError.js';
import User from '../models/User.js';

/**
 * @classdesc Classe com as funções que aplicam regras de negócio nas operações de autenticação
 */
class AuthServices {
    /**
     * Verifica e-mail e senha do usuário
     * @returns {void}
     */
    static async verifyPassword(user) {
        // valida senha

        // seria interessante salvar a senha em hash

        const userWithEmail = await User.findByEmail(user.email);

        if (!userWithEmail || userWithEmail?.senha != user.senha) {
            throw new CustomError('Dados incorretos!', 500);
        }
    }
}

export default AuthServices;
