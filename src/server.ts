import express from 'express';

const app = express();

app.get('/monitoring', (req, res) => {
  res.send(200);
});

app.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log('Server is running on 3000 port');
});
