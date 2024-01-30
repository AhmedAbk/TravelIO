import React, { useEffect, useState } from 'react';

function GetAllDestinations() {
  const [destinations, setDestinations] = useState([]); 

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/alldestinations');
        if (response.ok) {
          const data = await response.json();
          setDestinations(data);
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error.message);
      }
    };

    fetchDestinations();
  }, []);

  const handleDelete = async (destid) => {
    try {
      const response = await fetch(`http://localhost:3001/api/alldestinations/${destid}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDestinations((prevDestinations) => prevDestinations.filter((dest) => dest.destid !== destid));
      } else {
        console.error('Error deleting destination:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
 
 

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All Destinations</h2>
      <ul className="list-group">
        {destinations.map((destination) => (
          <li key={destination.destid} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{destination.destname}</strong>
              <br />
              <img src={destination.destimg} alt={destination.destname} className="img-fluid" style={{ maxWidth: '200px' }} />
            </div>
            <div>
              <button className="btn btn-danger mr-2" onClick={() => handleDelete(destination.destid)}>
                Delete
              </button>
             
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default GetAllDestinations;
