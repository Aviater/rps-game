import { Router } from 'express';
import { gameController } from '@/controllers';
import { moveValidator, nameValidator } from '@/middleware';

export const gameRouter = Router();

gameRouter.post('/', nameValidator, gameController.createGame);		// When one player joins, creates the game.
gameRouter.patch('/', nameValidator, gameController.startGame);		// When second player joins, starts the game.
gameRouter.patch('/move', moveValidator, gameController.makeMove);	// When a player makes a move, updates the game state.
gameRouter.get('/:id/results', gameController.getResults);			// If both players made moves, computes and returns game results.