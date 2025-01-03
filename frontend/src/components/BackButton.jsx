import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = ({ destination = '/' }) => {
  return (
    <div>
      <Link
        to={destination}
        className='bg-sky-800 text-white px-3 py-1.5 rounded-lg w-fit'
      >
        <ArrowBackIcon className='' />
      </Link>
    </div>
  );
};

export default BackButton;
