import * as express from 'express';
import api from './api';
import config from '../config/config';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

const app: express.Express = express();

const PORT: number = parseInt(process.env.PORT) || config.server.port;

const connectionString: string = `mongodb://${config.database.host}:${config.database.port}/${config.database.database}`;

// Connect to the database
mongoose.connect(connectionString, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', error => {
    console.log('Database connection error', error);
});

db.on('open', () => {
    console.log('Connected to database successfully!');
});


// use logger
app.use(morgan('dev'));
// parse url-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
// parse json-bodies
app.use(bodyParser.json());



app.use('/api/', api);



// only start server if file is executed and not only imported
// prevents jest from not shutting down because a server is still open
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}/`);
    });
}

export default app;