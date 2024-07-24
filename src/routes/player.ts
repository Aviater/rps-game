import { Router } from 'express';
import { playerController } from '@/controllers';

export const playerRouter = Router();

playerRouter.get('/game/:id', playerController.getAllPlayerInfo);
playerRouter.get('/:id', playerController.getPlayerInfo);