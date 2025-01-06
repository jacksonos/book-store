import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from '@mui/material';

const CreateBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveWork = () => {
    const data = { title, author, publicationYear };
    setLoading(true);
    try {
      axios.post('http://localhost:5000/books', data).then(() => {
        setLoading(false);
        navigate('/');
      });
    } catch (error) {
      setLoading(false);
      alert('An error occurred while saving the book to the database.');
      console.error(error.message);
    }
  };

  return (
    <Container maxWidth='md'>
      <BackButton />
      <h1 className='text-xl my-4'>Create a Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col'>
        <div className='mb-4'>
          <label className='mr-4 text'>Title:</label>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border border-gray-500 px-1 py-0.5 w-full'
          />
          <div className='my-4'>
            <label className='mr-4 text'>Author:</label>
            <input
              type='text'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='border border-gray-500 px-1 py-0.5 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='mr-4 text' l>
              Publish Year:
            </label>
            <input
              type='number'
              value={publicationYear}
              onChange={(e) => setPublicationYear(e.target.value)}
              className='border border-gray-500 px-1 py-0.5 w-full'
            />
          </div>
          <Button variant='contained' onClick={handleSaveWork}>
            Save
          </Button>
        </div>
      </div>
      <Box component='form' >
        <FormControl>
          <InputLabel htmlFor='title'>Email address</InputLabel>
          <Input id='title' aria-describedby='my-helper-text' type='text' />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='author'>Author</InputLabel>
          <Input id='author' aria-describedby='my-helper-text' type='text' />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='publishYear'>Publish year</InputLabel>
          <Input
            fullWidth
            id='publishYear'
            aria-describedby='my-helper-text'
            type='number'
          />
          <FormHelperText id='my-helper-text'>
          We'll never share your email.
        </FormHelperText>
        </FormControl>
      </Box>
    </Container>
  );
};

export default CreateBook;
