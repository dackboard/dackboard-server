import * as express from 'express';
import api from './api';
import config from '../config/config';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

const app: express.Express = express();

const PORT: number = parseInt(process.env.PORT) || config.server.port;

// use logger
app.use(morgan('dev'));
// parse url-encoded bodies
app.use(bodyParser.urlencoded({extended: false}));
// parse json-bodies
app.use(bodyParser.json());

app.use('/api/', api);

// only start server if file is executed and not only imported
// prevents jest from not shutting down because a server is still open
if(require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}/`);
    });
}

export default app;