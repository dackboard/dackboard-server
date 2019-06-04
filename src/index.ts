import * as express from 'express';
import { Request, Response } from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'hello world'
    });
});

// only start server if file is executed and not only imported
// prevents jest from not shutting down because a server is still open
if(require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}/`);
    });
}

export default app;