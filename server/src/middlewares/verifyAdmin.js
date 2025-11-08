import CustomError from '../helpers/customError.js';
import UserServices from '../services/userServices.js';

function verifyAdmin(req, res, next)
{
    // aqui valida se o usuário logado é um adm
    if (parseInt(req.userPayload?.role) != UserServices.ADM) {
        throw new CustomError('Somente administradores têm acesso a esse recurso!', 403);
    }

    next();
}

export default verifyAdmin;
