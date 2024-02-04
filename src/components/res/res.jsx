import React, { useState, useEffect } from 'react';

function Res() {
  const [name, setName] = useState('');
  const [numberOfTravelers, setNumberOfTravelers] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [cities, setCities] = useState([]);

  const handleReservation = async (e) => {
    e.preventDefault();

    try {
      // Fetch the selected city details, including the price
      const cityDetailsResponse = await fetch(`http://localhost:3001/api/cities/${selectedCity}`);
      const cityDetails = await cityDetailsResponse.json(); 
      const totalPrice = cityDetails.prices * numberOfTravelers;
 
      const response = await fetch('http://localhost:3001/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          numberOfTravelers,
          startDate,
          endDate,
          selectedCity,
          price: totalPrice, 
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Reservation submitted successfully:', data.reservation);
        // You can handle further UI updates or redirects here
      } else {
        console.error('Error submitting reservation:', data.error);
        // Handle error cases
      }
    } catch (error) {
      console.error('Error submitting reservation:', error);
      // Handle error cases
    }
  };

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/cities');
        const data = await res.json();
        setCities(data.data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    fetchCity();
  }, []);

  return (
    <div>
      {/* Reservation Form Start */}
      <div className="container mt-5">
        <h2>Reservation</h2>
        <form onSubmit={handleReservation}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="numberOfTravelers">Number of Travelers:</label>
            <input
              type="number"
              className="form-control"
              id="numberOfTravelers"
              value={numberOfTravelers}
              onChange={(e) => setNumberOfTravelers(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <select
              className="form-control"
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              <option value="" disabled>Select a city</option>
              {cities.map((city, index) => (
                <option key={index} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Reservation
          </button>
        </form>
      </div>
      {/* Reservation Form End */}
    </div>
  );
}

export default Res;
