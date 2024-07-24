import { IGame } from '@/interfaces';
import ExtendedError from '@/utils/ErrorHandler';

export const findPlayerInGame = (game: IGame, playerId: string) => {
	const player = game.getPlayerById(playerId);
	if(!player) throw new ExtendedError(404, 'Player not found.');
	
	return player;
};