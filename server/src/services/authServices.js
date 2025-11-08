import User from '../models/User.js';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import CustomError from '../helpers/customError.js';

/**
 * @classdesc Classe com as funções que aplicam regras de negócio nas operações de autenticação
 */
class AuthServices {
    /**
     * Verifica com regras e-mail e senha do usuário e gera token
     * @returns {json} Dados do usuário e de token.
     */
    static async verifyPassword(dados) {
        const { email, senha } = dados;

        // verificar qual regra de negócio aplicar
        const usuario = await User.findByEmail(email);

        if (!usuario || usuario?.senha != senha) {
            throw new CustomError('Dados incorretos!', 500);
        }

        // aqui chamo de payload mas é o que vai ser transformado em token
        const payload = {
            id: usuario.id,
            name: usuario.nome,
            role: usuario.tipo,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        return {
            payload: payload,
            token: token,
        };
    }
}

export default AuthServices;
