import { Game } from "../models";
import { IGame } from "../interfaces";

describe('Game class', () => {
	let game: IGame | null;
	const playerName = 'John Doe';

	beforeEach(() => {
		jest.mock('../models/Player');
		const Player = require('../models/Player').default;
		const player = new Player(playerName);
		game = new Game(player);
	});

	afterEach(() => {
		jest.clearAllMocks();
		game = null;
	});

	it('should return a game object.', () => {
		expect(game).toBeInstanceOf(Game);
	});

	it('should have an id property.', () => {
		expect(game!.gameId).toBeDefined();
	});

	it('should add a player to the game.', () => {
		const Player = require('../models/Player').default;
		const player = new Player('Jane Doe');

		game!.addPlayer(player);
		expect(game!.gamePlayers).toHaveLength(2);
	});

	it('should return true if both players have made a move.', () => {
		const Player = require('../models/Player').default;
		const player2 = new Player('John Doe');

		game!.addPlayer(player2);

		game!.gamePlayers[0].playerMove = 'rock';
		game!.gamePlayers[1].playerMove = 'scissors';
		expect(game!.playersHaveMadeMoves()).toBeTruthy();
	});

	it('should determine the outcome of the game.', () => {
		// mock the player moves
		const Player = require('../models/Player').default;
		const player2 = new Player('Jane Doe');

		// mock the game players
		game!.addPlayer(player2);

		// mock the player moves
		game!.gamePlayers[0].playerMove = 'rock';
		game!.gamePlayers[1].playerMove = 'scissors';

		// determine the outcome
		game!.determineOutcome();
		expect(game!.gamePlayers[0].playerResult).toBe('won');
		expect(game!.gamePlayers[1].playerResult).toBe('lost');

	});
});