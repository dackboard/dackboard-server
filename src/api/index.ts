import * as express from 'express';
import { Request, Response } from 'express';

const api = express();

// add api specific middleware here
api.get('/', (req: Request, res: Response) => {

    res.send({
        message: 'Hello from the API'
    });

});

// route /status
// displays various information about the server and the database
api.get('/', (req: Request, res: Response) => {

    

});

export default api;