import { Router } from 'express';
import { Request, Response } from 'express';
import RouteStatus from './routes/status';
import RouteUser from './routes/user';

const apiRouter: Router = Router();

// add api specific middleware here
apiRouter.get('/', (req: Request, res: Response) => {

    res.send({
        message: 'Hello from the APIv'
    });

});

// Server status route
apiRouter.use('/status', RouteStatus);
// User management
apiRouter.use('/user', RouteUser);

export default apiRouter;