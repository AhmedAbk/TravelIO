import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Dash() {
  const [income, setIncome] = useState(5000);
  const [numDestinations, setNumDestinations] = useState(10);
  const [numPackages, setNumPackages] = useState(25);
  const [numUsers, setNumUsers] = useState(100);
  const [numReviews, setNumReviews] = useState(50); 
 

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="sidebar">
              <ul>
                <Link to="/AddDest">
                <li>
                  Destinations 
                </li>
                </Link>
                <Link to='/GetAllCity'>
                <li>
                  Packages 
                </li>
                </Link>
                <Link to='/Users'>

                <li> Users 
                </li> 
                </Link>
              </ul>
            </div>
          </div>

          <div className="col-md-9">
            <h2>Admin Dashboard</h2>
            <div className="row">
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Income</h5>
                    <p className="card-text">${income}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Destinations</h5>
                    <p className="card-text">{numDestinations}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Packages</h5>
                    <p className="card-text">{numPackages}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Users</h5>
                    <p className="card-text">{numUsers}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mt-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Reviews</h5>
                    <p className="card-text">{numReviews}</p>
                  </div>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
}
  

export default Dash;

