import express from 'express';
import { PORT } from './config.js';

const app = express();

app.listen(PORT, () => {
  console.log(`Apps is listening top port ${PORT}`);
});
