import { Game, Player } from '@/models';
import { IGame } from '@/interfaces';
import logger from '@/utils/logger';
import ExtendedError from '@/utils/ErrorHandler';

class GameService {
	games: IGame[];

	constructor() {
		this.games = [];
	};

	get gamesList() {
		return this.games;
	};

	// Add cron job to run this method every day.
	flushStaleGames() {
		// Filter out games older than 30 days.
		const currentDate = new Date();
		const nonStaleGames = this.gamesList.filter(game => {
			(currentDate.getTime() - game.gameCreationDate.getTime()) < 2629746000;	// 2629746000 ms = 30 days.
		});

		logger.info(`Flushing stale games... \n${this.gamesList.length - nonStaleGames.length} games removed.`);
		this.games = nonStaleGames;
	};
	
	createGame(playerName: string) {
		const player = new Player(playerName);
		const game = new Game(player);

		this.gamesList.push(game);
		
		logger.info(`[Game ${game.gameId}]: Created by ${playerName}.`);
		return {
			gameId: game.gameId,
			player: player
		};
	};

	findGame(gameId: string) {
		if(!gameId) throw new ExtendedError(400, 'Game ID is required.');

		const foundGame = this.gamesList.find(game => game.gameId === gameId);
		if(!foundGame) throw new ExtendedError(404, 'Game not found.');

		return foundGame;
	};

	// Adds a player to an existing game and starts the game.
	startGame(gameId: string, playerName: string) {
		const game = this.findGame(gameId);

		if(game.gameStatus === 'concluded') throw new ExtendedError(403, 'Game has ended.');
		if(game.gameStatus === 'active') throw new ExtendedError(403, 'Game already in progress.');
		const player = new Player(playerName);
		game.addPlayer(player);
		game.gameStatus = 'active';

		logger.info(`[Game ${game.gameId}]: Started by ${playerName}.`);
		return {
			gameId: game.gameId,
			players: game.gamePlayers
		};
	};

	// Adds a player move to the game.
	makeMove(gameId: string, playerId: string, move: 'rock' | 'paper' | 'scissors') {
		if(!playerId) throw new ExtendedError(400, 'Player ID is required.');

		const game = this.findGame(gameId);
		const player = game.getPlayerById(playerId);

		if(game.gameStatus === 'idle') throw new ExtendedError(409, 'Waiting for second player to join.');
		if(game.gameStatus === 'concluded') throw new ExtendedError(403, 'Game has ended.');
		if(!player) throw new ExtendedError(404, 'Player not found.');
		if(player.playerMove) throw new ExtendedError(409, `You have already chosen ${player.playerMove}.`);

		player.playerMove = move;

		logger.info(`[Game ${game.gameId}]: Player ${player.playerName} chose: ${move}.`);
		return {
			gameId: game.gameId,
			player: player,
			playerMove: player.playerMove,
			resultsReady: game.playersHaveMadeMoves()
		};
	};

	// Determines the winner of the game.
	computeWinner(gameId: string) {
		const game = this.findGame(gameId);

		if(game.gameStatus === 'idle') throw new ExtendedError(403, 'Game has not started yet.');
		if(game.gamePlayers.some(player => !player.playerMove)) {
			throw new ExtendedError(409, 'Waiting for all players to make a move.');
		};

		if(game.gameStatus !== 'concluded') {
			game.determineOutcome();
			game.gameStatus = 'concluded';
		};
		
		const results = game.gamePlayers.map(player => ({
			name: player.playerName,
			move: player.playerMove,
			result: player.playerResult,
		}));

		logger.info(`[Game ${game.gameId}]: Game concluded. \n${results[0].name} ${results[0].result}. \n${results[1].name} ${results[1].result}.`);
		return results;
	};
};

export default new GameService();	// Singleton instance of GameService.