import winston from 'winston';
import logLevels from '@/config/logLevels.json';

const logger = winston.createLogger({
	levels: logLevels,
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.File({
			filename: './logs/error.log',
			level: 'error',
			format: winston.format.json()
		}),
		new winston.transports.File({
			filename: './logs/combined.log',
			level: 'info',
			format: winston.format.json()
		}),
	],
	exceptionHandlers: [
		new winston.transports.File({
			filename: './logs/exceptions.log',
			format: winston.format.json()
		})
	]
});

// If we're not in production then log to the console:
if (process.env.NODE_ENV !== 'production') {
	logger.add(new winston.transports.Console({
		level: 'debug',
		format: winston.format.combine(
			winston.format.colorize(),
			winston.format.simple()
		)
	}));
};

export default logger;