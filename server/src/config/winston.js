import 'dotenv/config';
import winston from 'winston';

const baseFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true })
);

const devConsoleFormat = winston.format.combine(
    baseFormat,
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => {
        const { timestamp, level, message, ...meta } = info;
        return `[${timestamp}] ${level}: ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}`;
    })
);

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: baseFormat,
    transports: [
        // console
        new winston.transports.Console({
            format: process.env.NODE_ENV === 'development' ? devConsoleFormat : winston.format.json(),
        }),

        // arquivo local
        new winston.transports.File({
            filename: './logs/app.log',
            format: winston.format.json(),
            level: 'info',
            // 5 MB
            maxsize: 5 * 1024 * 1024,
            maxFiles: 3,
        }),
    ],
});

export default logger;
