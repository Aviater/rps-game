import { v4 as uuidv4 } from 'uuid';
import { IGame, IPlayer } from '@/interfaces';

// values correspond to the winning player's index in the "players" array.
const outcomes: { [key: string]: number } = {
	'rock_scissors': 0,
	'paper_rock': 0,
	'scissors_paper': 0,
	'scissors_rock': 1,
	'rock_paper': 1,
	'paper_scissors': 1,
};

class Game implements IGame {
	id: string;
	creationDate: Date;
	players: IPlayer[] = [];
	status: 'idle' | 'active' | 'concluded';
	
	constructor(player: IPlayer) {
		this.id = uuidv4();
		this.creationDate = new Date();
		this.players.push(player);
		this.status = 'idle';
	};
	
	get gameId() {
		return this.id;
	};

	get gameCreationDate() {
		return this.creationDate;
	};

	get gamePlayers() {
		return this.players;
	};

	get gameStatus() {
		return this.status;
	};

	set gameStatus(status: 'idle' | 'active' | 'concluded') {
		this.status = status;
	};

	getPlayerById(playerId: string) {
		return this.gamePlayers.find(player => player.playerId === playerId);
	};

	addPlayer(player: IPlayer) {
		this.gamePlayers.push(player);
	};

	playersHaveMadeMoves() {
		return this.gamePlayers.every(player => player.playerMove);
	};

	determineOutcome() {
		const player1Move = this.gamePlayers[0].playerMove;
		const player2Move = this.gamePlayers[1].playerMove;

		if (player1Move === player2Move) {
			this.gamePlayers.forEach(player => player.playerResult = 'draw');
			return;
		};
		
		const resultKey = `${player1Move}_${player2Move}`;
		const winningPlayerIndex = outcomes[resultKey];
		this.gamePlayers[winningPlayerIndex].playerResult = 'won';
		this.gamePlayers[winningPlayerIndex === 0 ? 1 : 0].playerResult = 'lost';
	};
};

export default Game;