import logger from './logger';

class ExtendedError extends Error {
	constructor(public status = 500, message: string) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
		status !== 500 && logger.warn(`${this.name} [${status}]: ${this.message}`);
		status === 500 && logger.error(`${this.name} [${status}]: ${this.message}`);
	};
};

export default ExtendedError;