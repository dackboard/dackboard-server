import { Router } from 'express';
import { post } from '../controllers/authenticate/post';

const authenticationRouter: Router = Router();

authenticationRouter.post('/', post);

export default authenticationRouter;