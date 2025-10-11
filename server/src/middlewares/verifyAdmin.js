import UserServices from '../services/userServices.js';

function verifyAdmin(req, res, next)
{
    // aqui valida se o usuário logado é um adm
    if (parseInt(req.userPayload?.role) != UserServices.ADM) {
        res.status(403).json({ error: 'Somente administradores têm acesso a esse recurso!' });
    }

    next();
}

export default verifyAdmin;
