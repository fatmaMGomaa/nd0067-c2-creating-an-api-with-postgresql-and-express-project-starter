import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import pool, { config } from './database';

const app: express.Application = express();

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Fatma World!');
});

pool.connect().then((client) => {
  return client
    .query('SELECT NOW()')
    .then((res) => {
      client.release();
      console.log(res.rows);
    })
    .catch((err) => {
      client.release();
      console.log(err.message);
    });
});

app.listen(config.PORT, () => {
  console.log(`starting app on: ${config.PORT}`);
});
