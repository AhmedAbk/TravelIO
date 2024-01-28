import React, { useState, useEffect } from 'react';
import Foot from '../Footer/Foot';


function Paris() {
  const [packageData, setPackageData] = useState(null);
  const [citydetail, setcitydetail] = useState(null);

  useEffect(() => { 

    fetch(`http://localhost:3001/city/1`)
      .then(response => response.json())
      .then(data => {
        setPackageData(data.data);
        console.log(data);
        setcitydetail(data.data); 
      
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!packageData || !citydetail) { 
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row"> 
          <div className="col-md-6 mb-4">
            <img src={citydetail.image}   className="img-fluid" />
          </div> 
          <div className="col-md-6">
            <h2 className="mb-4">{citydetail.name}</h2>
            <p>{citydetail.description}</p>
            <h4 className="mt-4">Package Details:</h4>
            <ul>
              <li>Duration: {citydetail.duration}</li>
              <li>Prices starting from {citydetail.prices}</li>
            </ul> 
            <button className="btn btn-primary mt-3" >
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
