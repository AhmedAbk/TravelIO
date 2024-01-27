import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Destres = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/cities/${id}`);
        const data = await response.json();

        console.log(id);  
        console.log(data);

        if (response.ok) {
          setDestination(data);  
        } else {
          setError(`Error: ${data.message || 'Failed to fetch'}`);
        }
      } catch (error) {
        setError(`Error fetching destination: ${error.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  } 

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>{destination.data.name}</h2>
      desc<p>{destination.data.description}</p> 
    </div>
  );
};

export default Destres;
