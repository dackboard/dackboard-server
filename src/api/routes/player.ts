import { Router } from 'express';
import { postAdd } from '../controllers/player/postAdd';
import { getList } from '../controllers/player/getList';

const playerRouter: Router = Router();

playerRouter.post('/add', postAdd);
playerRouter.get('/list', getList);

export default playerRouter;