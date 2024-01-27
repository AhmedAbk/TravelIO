// Dest.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Destres from './destres';


function Dest() {
  const [destinations, setDestinations] = useState([]);  
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  console.log({destinations});

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        // Replace the URL with your actual API endpoint
        const response = await fetch('http://localhost:3001/api/dest');
        const data = await response.json();
        setDestinations(data.data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination);
  };

  return (
    <div>
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>
              Destination
            </h6>
            <h1>Explore Top Destinations</h1>
          </div>
          <div className="row">
            {destinations.map((destination) => (
              <div className="col-lg-4 col-md-6 mb-4" key={destination.destid}>
                <div
                  className="destination-item position-relative overflow-hidden mb-2"
                  onClick={() => handleDestinationClick(destination)}
                >
                  <Link to={`/Dest/${destination.destid}`}>
                    <img
                      className="img-fluid"
                      src={destination.destimg}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                      alt={destination.destname}
                    />
                    <div className="destination-overlay text-white text-decoration-none">
                      <h5 className="text-white">{destination.destname}</h5>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

       <Destres  destinations={destinations}/>
      
    </div>
  );
}

export default Dest;
