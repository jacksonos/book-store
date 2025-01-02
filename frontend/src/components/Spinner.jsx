import React, { useState } from 'react';

const Spinner = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    return () => {
      second;
    };
  }, []);

  return <div>Spinner</div>;
};

export default Spinner;
