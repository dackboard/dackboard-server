import * as express from 'express';
import api from './api';
import config from '../config/config';

const app = express();

const PORT = process.env.PORT || config.server.port;

app.use('/api/', api);

// only start server if file is executed and not only imported
// prevents jest from not shutting down because a server is still open
if(require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}/`);
    });
}

export default app;