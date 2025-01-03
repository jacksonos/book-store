import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { useParams } from 'react-router-dom';

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
    <div>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className=''>Id</span>
            <span>{book._id}</span>
          </div>
          <div className='my-4'>
            <span className=''>Title</span>
            <span>{book.title}</span>
          </div>
          <div className='my-4'>
            <span className=''>Author</span>
            <span>{book.author}</span>
          </div>
          <div className='my-4'>
            <span className=''>Create Time</span>
            <span>{new Date(book.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className=''>Last Updated Time</span>
            <span>{new Date(book.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;
