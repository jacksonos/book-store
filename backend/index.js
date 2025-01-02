import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import booksRoute from './routes/booksRoute.js';

dotenv.config();

const app = express();

//Middleware for passing req body
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(234).send('Hello from the server!');
});

app.use('/books', booksRoute);

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('app sucessfully connected to db');
    app.listen(process.env.PORT, () => {
      console.log(`Apps is listening top port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
