import { Request, Response, NextFunction } from 'express';
import { IPlayer } from '@/interfaces';

export const moveValidator = (req: Request, res: Response, next: NextFunction) => {
	const move: IPlayer['move'] = req.body.move.toLowerCase();

	if (!move) {
		res.status(400).send("Move is required.");
		return;
	};

	const allowedMoves: IPlayer['move'][] = ['rock', 'paper', 'scissors'];
	if (!allowedMoves.includes(move)) {
		res.status(400).send("Invalid move.");
		return;
	};

	next();
};