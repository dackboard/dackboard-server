import { Router } from 'express';
import { postAdd } from '../controllers/user/postAdd';
import { getNameAvailable } from '../controllers/user/getNameAvailable';
import { getEmailAvailable } from '../controllers/user/getEmailAvailable';

const userRouter: Router = Router();

userRouter.post('/add', postAdd)
userRouter.get('/name-available/:name', getNameAvailable);
userRouter.get('/email-available/:email', getEmailAvailable);

export default userRouter;