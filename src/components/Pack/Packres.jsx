// Packres.jsx

import React from 'react';

const Packres = ({ selectedCity }) => {
  if (!selectedCity) {
    return <div>Please select a city to view details.</div>;
  }

  return (
    <div>
      <h2>{selectedCity.name}</h2>
      <p>
        <strong>Description:</strong> {selectedCity.description}
      </p>
      <p>
        <strong>Duration:</strong> {selectedCity.duration}
      </p>
      <p>
        <strong>Number of Persons:</strong> {selectedCity.person}
      </p>
      <p>
        <strong>Rating:</strong> {selectedCity.rating} ({selectedCity.review} reviews)
      </p>
      <p>
        <strong>Price:</strong> {selectedCity.prices}
      </p>
      {/* Add more details as needed */}
    </div>
  );
};

export default Packres;
