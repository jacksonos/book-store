import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/books/${id}`);
        setBook(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth='md'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col rounded-xl w-fit p-4 border'>
          <div className='my-1.5 flex flex-col'>
            <span className='font-semibold'>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-1.5 flex flex-col'>
            <span className='font-semibold'>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-1.5 flex flex-col'>
            <span className='font-semibold'>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-1.5 flex flex-col'>
            <span className='font-semibold'>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-1.5 flex flex-col'>
            <span className='font-semibold'>Last Updated Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ShowBook;
