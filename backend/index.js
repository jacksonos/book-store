import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Book } from './models/bookModel.js';

dotenv.config();

const app = express();

//Middleware for passing req body
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(234).send('Hello from the server!');
});

//Route to save a new book
app.post('/books', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publicationYear) {
      return res.status(400).send({ message: 'All fields are required' });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publicationYear: req.body.publicationYear,
    };

    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route to get all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route to get a single book
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send({ message: 'Book not found' });
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route to update a book
app.put('/books/:id', async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publicationYear) {
      return response.status(400).send({ message: 'Send all required fields' });
    }
    const result = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!result) return res.status(404).json({ message: 'Book not found' });
    return res.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

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
