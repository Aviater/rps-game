import { Request, Response, NextFunction } from 'express';

export const nameValidator = (req: Request, res: Response, next: NextFunction) => {
	const name: string = req.body.name;

	if (!name) {
		res.status(400).send("Name is required.");
		return;
	};

	if (name.length < 2 || name.length > 20) {
		res.status(400).send("Name must be between 2 - 20 characters.");
		return;
	};

	next();
};