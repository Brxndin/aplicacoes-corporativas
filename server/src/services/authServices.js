import User from "../models/User";

class AuthServices
{
    static async verifyPassword(dados) {
        const { email, senha } = dados;

        // verificar qual regra de negócio aplicar
        const usuario = await User.findByEmail(email);

        if (!usuario || usuario?.senha != senha) {
            throw new Error("Dados incorretos!");
        }

        // verificar se aqui já vai trabalhar com o JWT

        return usuario;
    }
}

export default AuthServices;