import express from 'express';
import redis from 'redis';
import { Pool } from 'pg';

const {
  PORT = 3000,
  REDIS_PORT = 6379,
  REDIS_HOST = 'redis-server',
  DB_USER,
  DB_PASSWORD,
  DB_HOST
} = process.env;

const app = express();
const rc = redis.createClient({
  host: REDIS_HOST,
  port: Number(REDIS_PORT)
});
const bdPool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
});

// tslint:disable-next-line:no-console
bdPool.on('error', (e) => console.log('POSTGRES ERROR', e));

app.get('/', (req: express.Request, res: express.Response) => {
  rc.get('visits', async (err, reply) => {
    const visits = err ? 0 : Number(reply);
    const { rows: [{ now }] } = await bdPool.query('SELECT NOW()');

    res.send(`[${now}]: Hello guest number #${reply}!`);
    rc.set('visits', String(visits + 1))
  });
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running on ${PORT} port`);
});
