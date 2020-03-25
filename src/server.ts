import express from 'express';
import redis from 'redis';

const {PORT = 3000, REDIS_PORT = 6379 } = process.env;

const app = express();
const rc = redis.createClient({
  host: 'redis-server',
  port: Number(REDIS_PORT)
});

rc.set('visits', String(0));

app.get('/', (req: express.Request, res: express.Response) => {
  rc.get('visits', ((err, reply) => {
    const visits = Number(reply);

    res.send(`Hello guest number #${reply}!`);
    rc.set('visits', String(visits + 1))
  }));
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Server is running on ${PORT} port`);
});
