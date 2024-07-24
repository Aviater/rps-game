import { Request, Response } from 'express';
import { gameService } from '@/services';

export const createGame = (req: Request, res: Response) => {
	const name: string = req.body.name;

	try {
		const { gameId, player } = gameService.createGame(name);
		const msg = `
			Welcome, ${player.playerName}, to the Rock, Paper, Scissors thunderdome! \n
			Your player ID is: ${player.playerId}. You will need it to make your move when the game starts. \n
			==================== \n
			Invite your challenger to the game with the ID below. \n
			${gameId} \n
		`;
		
		res.status(201).send(msg);
	} catch(err: any) {
		res.status(err.status || 500).send(err.message);
	};
};

export const startGame = (req: Request, res: Response) => {
	const gameId: string = req.body.gameId;
	const name: string = req.body.name;

	try {
		const data = gameService.startGame(gameId, name);
		const firstPlayer = data.players[0];
		const secondPlayer = data.players[1];
		const msg = `
			Welcome, ${secondPlayer.playerName}, to the Rock, Paper, Scissors thunderdome! \n
			Your player ID is: ${secondPlayer.playerId}. You will need it to make your move. \n
			==================== \n
			Game ${data.gameId} is starting! \n
			Challenger 1: ${firstPlayer.playerName} \n
			Challenger 2: ${secondPlayer.playerName} \n
			==================== \n
			Make your moves! \n
		`;

		res.send(msg);
	} catch(err: any) {
		res.status(err.status || 500).send(err.message);
	};
};

export const makeMove = (req: Request, res: Response) => {
	const gameId: string = req.body.gameId;
	const playerId: string = req.body.playerId;
	const move: 'rock' | 'paper' | 'scissors' = req.body.move;

	try {
		const data = gameService.makeMove(gameId, playerId, move);

		const resultReadyMsg = `
			Both players have made their moves! \n
			==================== \n
			Result can be found on: \n
			/api/game/${data.gameId}/results \n
		`;

		const moveMesg = `
			Game ${data.gameId} is in progress. \n
			==================== \n
			${data.player.playerName} chose ${move}! \n\n
		`;

		const msg = data.resultsReady ? moveMesg + resultReadyMsg : moveMesg;
		if(!data.resultsReady) {
			res.send(msg);
			return;
		};
			
		res.send(msg);
	} catch(err: any) {
		res.status(err.status || 500).send(err.message);
	};
};

export const getResults = (req: Request, res: Response) => {
	const gameId: string = req.params.id;
	
	try {
		const data = gameService.computeWinner(gameId);
		const drawMsg = `It's a draw!`;
		const wonLostMsg = `
			${data[0].name} ${data[0].result}! \n
			${data[1].name} ${data[1].result}!
		`;

		const msg = `
			Game ${gameId} concluded. \n
			==================== \n
			${data[0].name} chose ${data[0].move} \n
			${data[1].name} chose ${data[1].move} \n\n
			${data[0].result === 'draw' ? drawMsg : wonLostMsg} \n
		`;

		res.send(msg);
	} catch(err: any) {
		res.status(err.status || 500).send(err.message);
	};
};