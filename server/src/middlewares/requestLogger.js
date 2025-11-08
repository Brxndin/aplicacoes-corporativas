import { v4 as uuidv4 } from 'uuid';
import logger from '../config/winston.js';

function requestLogger(req, res, next) {
    const start = process.hrtime.bigint();
    const requestId = uuidv4();
    
    req.requestId = requestId;
    res.setHeader('X-Request-Id', requestId);
    
    const baseInfo = {
        requestId,
        method: req.method,
        url: req.originalUrl || req.url,
        ip: req.ip,
        userAgent: req.headers['user-agent'],
    };

    // log inicial
    logger.info('request:start', baseInfo);

    res.on('finish', () => {
        const end = process.hrtime.bigint();

        // converte nanos para milissegundos;
        const durationMs = Number(end - start) / 1_000_000;

        const status = res.statusCode;
        const level = status >= 500 ? 'error' : status >= 400 ? 'warn' : 'info';

        const finishInfo = {
            ...baseInfo,
            status: status,
            durationMs: Number(durationMs.toFixed(2)),
            contentLength: res.getHeader('content-length'),
        };

        // log final
        logger.log({ level, message: 'request:finish', ...finishInfo });
    });

    next();
}

export default requestLogger;
