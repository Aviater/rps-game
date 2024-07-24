declare global {
	class ExtendedError extends Error {
		status: number;
		constructor(status: number, message: string);
	};
};

export { };