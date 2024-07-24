import { v4 as uuidv4 } from 'uuid';
import { IPlayer } from '@/interfaces';

class Player implements IPlayer {
	id: string;
	name: string;
	move: 'rock' | 'paper' | 'scissors' | null;
	result: 'won' | 'lost' | 'draw' | null;

	constructor(name: string) {
		this.id = uuidv4();
		this.name = name;
		this.move = null;
		this.result = null;
	};
	
	get playerId() {
		return this.id;
	};

	get playerName() {
		return this.name;
	};

	get playerMove() {
		return this.move;
	};

	get playerResult() {
		return this.result;
	};

	set playerResult(result: 'won' | 'lost' | 'draw' | null) {
		this.result = result;
	};

	set playerMove(move: 'rock' | 'paper' | 'scissors' | null) {
		this.move = move;
	};
};

export default Player;