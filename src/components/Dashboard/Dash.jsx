import React, { useState } from 'react';

function Dash() {
  const [income, setIncome] = useState(5000);
  const [numDestinations, setNumDestinations] = useState(10);
  const [numPackages, setNumPackages] = useState(25);
  const [numUsers, setNumUsers] = useState(100);
  const [numReviews, setNumReviews] = useState(50);

  const [cities, setCities] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const addCity = (city) => {
    setCities([...cities, city]);
  };

  const addDestination = (destination) => {
    setDestinations([...destinations, destination]);
  };

  const editCity = (index, newCity) => {
    const updatedCities = [...cities];
    updatedCities[index] = newCity;
    setCities(updatedCities);
  };

  const editDestination = (index, newDestination) => {
    const updatedDestinations = [...destinations];
    updatedDestinations[index] = newDestination;
    setDestinations(updatedDestinations);
  };

  const deleteCity = (index) => {
    const updatedCities = [...cities];
    updatedCities.splice(index, 1);
    setCities(updatedCities);
  };

  const deleteDestination = (index) => {
    const updatedDestinations = [...destinations];
    updatedDestinations.splice(index, 1);
    setDestinations(updatedDestinations);
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3">
            <div className="sidebar">
              <ul>
                <li>
                  <a href="#destinations">Destinations</a>
                </li>
                <li>
                  <a href="#packages">Packages</a>
                </li>
                <li>
                  <a href="#users">Users</a>
                </li>
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

            {/* Add/Edit City and Add/Edit Destination components */}
            <AddEditCity addCity={addCity} />
            <AddEditDestination addDestination={addDestination} />

            {/* List Cities and List Destinations components */}
            <ListCities cities={cities} editCity={editCity} deleteCity={deleteCity} />
            <ListDestinations destinations={destinations} editDestination={editDestination} deleteDestination={deleteDestination} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Example Add/Edit City Component
function AddEditCity({ addCity }) {
  const [newCity, setNewCity] = useState('');

  const handleAddCity = () => {
    addCity(newCity);
    setNewCity('');
  };

  return (
    <div className="col-md-3 mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add City</h5>
          <input type="text" value={newCity} onChange={(e) => setNewCity(e.target.value)} />
          <button onClick={handleAddCity}>Add</button>
        </div>
      </div>
    </div>
  );
}

// Example Add/Edit Destination Component
function AddEditDestination({ addDestination }) {
  const [newDestination, setNewDestination] = useState('');

  const handleAddDestination = () => {
    addDestination(newDestination);
    setNewDestination('');
  };

  return (
    <div className="col-md-3 mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Add Destination</h5>
          <input type="text" value={newDestination} onChange={(e) => setNewDestination(e.target.value)} />
          <button onClick={handleAddDestination}>Add</button>
        </div>
      </div>
    </div>
  );
}

// Example List Cities Component
function ListCities({ cities, editCity, deleteCity }) {
  return (
    <div className="row">
      {cities.map((city, index) => (
        <div className="col-md-3 mt-4" key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{city}</h5>
              <button onClick={() => editCity(index, prompt('Enter new city name:'))}>Edit</button>
              <button onClick={() => deleteCity(index)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Example List Destinations Component
function ListDestinations({ destinations, editDestination, deleteDestination }) {
  return (
    <div className="row">
      {destinations.map((destination, index) => (
        <div className="col-md-3 mt-4" key={index}>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{destination}</h5>
              <button onClick={() => editDestination(index, prompt('Enter new destination name:'))}>Edit</button>
              <button onClick={() => deleteDestination(index)}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dash;

