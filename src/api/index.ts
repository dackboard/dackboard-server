import { Router } from 'express';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import RouteStatus from './routes/status';
import RouteUser from './routes/user';
import RouteAuthenticate from './routes/authenticate';
import config from '../../config/config';

const apiRouter: Router = Router();

// add api specific middleware here
apiRouter.get('/', (req: Request, res: Response) => {

    res.send({
        message: 'Hello from the APIv'
    });

});

//
//  PUBLIC ROUTES
//

// Server status route
apiRouter.use('/status', RouteStatus);
// User management
apiRouter.use('/user', RouteUser);
// Authentication route
apiRouter.use('/authenticate', RouteAuthenticate);

// AUTHENTICATION
apiRouter.use((req: Request|any, res: Response, next) => {

    // check if token exists
    const token: string = req.body.token || req.query.token || req.headers['x-access-token'];

    // if user has a token
    if(token) {

        // verify the token
        jwt.verify(token, config.authSecret, (error, decoded) => {

            // invalid
            if(error) {

                console.error(error);
                return res.status(403).json({
                    success: false,
                    message: 'AUTH_FAILED_TOKEN_INVALID'
                });
            
            // valid
            } else {
                req.session = decoded;
                next();
            }

        });


    // if user doesn't have a token
    } else {
        return res  .status(401)
                    .header(
                        'WWW-Authenticate', 
                        'Pass authentication token. Possibilities: header value "x-access-token", query value "token", json body value "token"'
                    )
                    .json({
                        success: false,
                        message: 'AUTH_FAILED_NO_TOKEN'
                    });
    }

});

//
//  PRIVATE ROUTES
//


export default apiRouter;