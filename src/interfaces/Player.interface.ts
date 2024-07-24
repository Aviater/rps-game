export interface IPlayer {
	id: string;
	name: string;
	move: 'rock' | 'paper' | 'scissors' | null;
	result: 'won' | 'lost' | 'draw' | null;
	readonly playerId: string;
	readonly playerName: string;
	playerResult: 'won' | 'lost' | 'draw' | null;
	playerMove: 'rock' | 'paper' | 'scissors' | null;
};