import { Request, Response } from 'express';
import { gameService } from '@/services';
import { playerService } from '@/services';

export const getAllPlayerInfo = (req: Request, res: Response) => {
	const gameId: string = req.params.id;

	try {
		const game = gameService.findGame(gameId);
		const player1 = game.gamePlayers[0];
		const player2 = game.gamePlayers[1];

		const msg = `
			Player info for game ${game.gameId} \n
			==================== \n
			Player 1: ${player1.playerName} \n
			Player 2: ${player2?.playerName || 'Not joined.'} \n
		`;

		res.send(msg);
	} catch(err: any) {
		res.status(err.status || 500).send(err.message);
	};
};

export const getPlayerInfo = (req: Request, res: Response) => {
	const playerId: string = req.params.id;
	const gameId = req.query.game;

	if (typeof gameId !== 'string') {
        res.status(400).send("Invalid game ID");
        return;
    }

	try {
		const game = gameService.findGame(gameId);
		const player = playerService.findPlayerInGame(game, playerId);

		const msg = `
			Player info for game ${game.gameId} \n
			==================== \n
			Player: ${player.playerName} \n
			Has made move: ${player.playerMove ? 'Yes' : 'No'} \n
			Result: ${player.playerResult ? player.playerResult : 'waiting'} \n
		`;

		res.send(msg);
	} catch(err: any) {
		res.status(err.status || 500).send(err.message);
	};
};