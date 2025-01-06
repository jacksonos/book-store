import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';

const BackButton = ({ destination = '/' }) => {
  return (
    <Link to={destination}>
      <Button variant='outlined' startIcon={<ArrowBackIcon />}>
      Back
      </Button>
    </Link>
  );
};

export default BackButton;
