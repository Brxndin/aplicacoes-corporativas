import logger from '../config/winston.js';

function errorHandler(error, req, res, next) {
    const status = error.status || error.statusCode || 500;

    const logPayload = {
        requestId: req.requestId,
        method: req.method,
        url: req.originalUrl || req.url,
        status: status,
        stack: error.stack,
        name: error.name,
    };

    // define o nível de log com base no tipo de erro
    const level = status >= 500 ? 'error' : 'warn';

    // log de erro
    logger.log({ level, message: 'request:error', ...logPayload });

    // resposta padrão para caso de erro na request
    const responseBody = {
        error: error,
        message: error.message,
        requestId: req.requestId,
    };

    if ('auth' in error) {
        responseBody.auth = error.auth;
    }

    res.status(status).json(responseBody);
}

export default errorHandler;
