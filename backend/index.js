import express from 'express';
import { PORT } from './config.js';

const app = express();

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('welcome');
});

app.listen(PORT, () => {
  console.log(`Apps is listening top port ${PORT}`);
});
