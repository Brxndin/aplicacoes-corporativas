import 'dotenv/config';

function verifyJWT(req, res, next)
{
    // cabeçalho authorization
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        res.status(401).json({ 
            auth: false, 
            message: 'É preciso informar o token de acesso!' 
        })
    };

    // aqui substitui pois o header vem em texto puro
    const token = authHeader.replace('Bearer ', '');

    // Verifica se a chave secreta e a assinatura são válidas
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            res.status(500).json({
                auth: false,
                message: 'Falha ao autenticar o token.'
            });
        }
        
        // aqui é mais usado para personalizar mensagens no front com o nome do usuário, permissões de adm e etc
        req.user = decoded;

        next();
    });
}

export default verifyJWT;