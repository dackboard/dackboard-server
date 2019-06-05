import { Router } from 'express';
import { getStatus } from '../controllers/status/get';

const statusRouter: Router = Router();

// GET /api/status
statusRouter.get('/', getStatus);

export default statusRouter;
