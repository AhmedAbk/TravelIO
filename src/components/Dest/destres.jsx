import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Destres = () => {
  const { id } = useParams();
  const [selectedDestination, setSelectedDestination] = useState( );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/cities/${id}`);
        const data = await response.json();

        console.log(id); // Log the id to check if it's correct
        console.log(data); 

        if (response.ok) {
          setSelectedDestination(data);
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
      {/* Display information about the selected destination */}
      {selectedDestination && (
        <div>
          <h2>{selectedDestination.name}</h2>
          <img src={selectedDestination.image} alt={selectedDestination.name} />
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default Destres;
