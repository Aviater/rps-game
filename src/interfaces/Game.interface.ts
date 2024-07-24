import { IPlayer } from './Player.interface';

export interface IGame {
	readonly id: string;
	readonly creationDate: Date;
	players: IPlayer[];
	status: 'idle' | 'active' | 'concluded';
	readonly gameId: string;
	readonly gameCreationDate: Date;
	readonly gamePlayers: IPlayer[];
	gameStatus: 'idle' | 'active' | 'concluded';
	getPlayerById: (playerId: string) => IPlayer | undefined;
	addPlayer: (player: IPlayer) => void;
	playersHaveMadeMoves: () => boolean;
	determineOutcome: () => void;
};