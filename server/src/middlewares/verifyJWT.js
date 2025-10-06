import 'dotenv/config';
import jwt from 'jsonwebtoken';

function verifyJWT(req, res, next)
{
    // cabeçalho authorization
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        // aqui usa status específico para que o front capture o erro
        res.status(401).json({
            message: 'É preciso informar o token de acesso!',
        });
    }

    // aqui substitui pois o header vem em texto puro
    const token = authHeader.replace('Bearer ', '');

    try {
        // Verifica se o token é valido
        jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
            if (error) {
                throw new error;
            }

            // aqui pega as informações do token que foram salvas no login
            // é usado posteriormente quando precisa saber se o usuário é adm
            req.userPayload = payload;
        });

        next();
    } catch (error) {
        // aqui usa status específico para que o front capture o erro
        res.status(401).json({
            message: `Falha ao autenticar o token: ${error.message}`,
        });
  }
}

export default verifyJWT;
