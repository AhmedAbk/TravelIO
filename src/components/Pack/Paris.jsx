import React, { useState, useEffect } from 'react';
import Foot from '../Footer/Foot';

function Paris() {
  const [packageData, setPackageData] = useState(null);
  const [parisdetail, setParisDetail] = useState(null);

  useEffect(() => { 
    const cityId = 2;

    fetch(`http://localhost:3001/api/cities/${cityId}`)
      .then(response => response.json())
      .then(data => {
        setPackageData(data.data);
        console.log(data);
        setParisDetail(data.data); 
        console.log(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!packageData || !parisdetail) { 
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          {/* Paris Image */}
          <div className="col-md-6 mb-4">
            <img src={parisdetail.image} alt="Paris" className="img-fluid" />
          </div>
          {/* Paris Description, Prices, and Duration */}
          <div className="col-md-6">
            <h2 className="mb-4">{parisdetail.name}</h2>
            <p>{parisdetail.description}</p>
            <h4 className="mt-4">Package Details:</h4>
            <ul>
              <li>Duration: {parisdetail.duration}</li>
              <li>Prices starting from {parisdetail.prices}</li>
            </ul>
            {/* Book Now Button */}
            <button className="btn btn-primary mt-3" onClick={() => alert('Book Now clicked!')}>
              Book Now
            </button>
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
}

export default Paris;
