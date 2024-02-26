import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GetAllCity from '../admin/getallcity';  
import GetAllDestinations from '../admin/getalldest';  

function Dash() {
  const [city, setCity] = useState([]);
  const [income, setIncome] = useState([]);
  const [dest, setDest] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchstat = async () => {
    
    };
  
    fetchstat();
    getCitiesData();
    getIncomeData();
    getUsersData();
    getDestData();
  }, []);

  const getUsersData = async () => {
    try {
      const res = await fetch('http://localhost:3001/stats/users');
      const data = await res.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching users data:', error);
    }
  };

  const getCitiesData = async () => {
    try {
      const res = await fetch('http://localhost:3001/stats/cities');
      const data = await res.json();
      setCity(data);
    } catch (error) {
      console.error('Error fetching cities data:', error);
    }
  };

  const getIncomeData = async () => {
    try {
      const res = await fetch('http://localhost:3001/stats/income');
      const data = await res.json();
      setIncome(data);
    } catch (error) {
      console.error('Error fetching income data:', error);
    }
  };
  const getDestData = async () => {
    try {
      const res = await fetch('http://localhost:3001/stats/dests');
      const data = await res.json();
      setDest(data.data);
    } catch (error) {
      console.error('Error fetching destination data:', error);
    }
  };
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="sidebar">
              <ul>
                <Link to="/GetAllDest">
                  <li>Destinations</li>
                </Link>
                <Link to='/GetAllCity'>
                  <li>Packages</li>
                </Link>
                <Link to='/Users'>
                  <li>Users</li>
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
                    <p className="card-text">{JSON.stringify(income)}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Destination</h5>
                    <p className="card-text">{JSON.stringify(dest)}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Packages</h5>
                    <p className="card-text">{JSON.stringify(city)}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Users</h5>
                    <p className="card-text">{JSON.stringify(user)}</p>
                  </div>
                </div>
              </div>
            </div>

            <GetAllCity />
            <GetAllDestinations />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
