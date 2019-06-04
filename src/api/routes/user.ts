import { Router } from 'express';
import { postAdd } from '../controllers/user/add';

const userRouter: Router = Router();

userRouter.post('/add', postAdd)

export default userRouter;