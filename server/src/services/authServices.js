import User from "../models/User.js";
import 'dotenv/config';
import jwt from 'jsonwebtoken';

class AuthServices
{
    static async verifyPassword(dados) {
        const { email, senha } = dados;

        // verificar qual regra de negócio aplicar
        const usuario = await User.findByEmail(email);

        if (!usuario || usuario?.senha != senha) {
            throw new Error("Dados incorretos!");
        }

        // aqui chamo de payload mas é o que vai ser transformado em token
        const payload = {
            id: usuario.id,
            name: usuario.nome,
            role: usuario.tipo,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        return {
            payload: payload,
            token: token
        };
    }
}

export default AuthServices;