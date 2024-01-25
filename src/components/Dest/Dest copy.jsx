import React, { useState, useEffect } from 'react';

const Dest = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/dest');
        const data = await response.json();
        setDestinations(data.data);  
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div> 
      <ul>
        {destinations.map((dest) => (
          <li key={dest.destid}>
            <img src={dest.destimg} alt={dest.destname} />
            <p>{dest.destname}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dest;
