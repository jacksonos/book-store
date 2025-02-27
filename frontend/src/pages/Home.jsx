import axios from 'axios';
import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Container,
  Paper,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          'http://localhost:5000/books'
        );
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container maxWidth='md'>
      <Link to='/books/create'>
        <Button variant='contained' startIcon={<AddBoxIcon />}>
          New Book
        </Button>
      </Link>
      {loading ? (
        <Spinner />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Publication Year</TableCell>
                <TableCell>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book, index) => (
                <TableRow key={book._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell className='font-black'>
                    {book.publicationYear}
                  </TableCell>
                  <TableCell>
                    <Link to={`/books/details/${book._id}`}>
                      <InfoIcon />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <EditIcon />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <DeleteIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Home;
