import React, { useEffect, useState } from 'react';

function Cart() {
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/allreservations');
        if (response.ok) {
          const data = await response.json();
          setReservations(data);
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching reservations:', error.message);
      }
    };

    fetchReservations();
  }, []);

  const handleCancelReservation = async (reservationId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/cancelreservation/${reservationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReservations((prevReservations) =>
          prevReservations.filter((reservation) => reservation.id !== reservationId)
        );
      } else {
        console.error('Error canceling reservation:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Reservations</h2>
      <ul className="list-group">
        {reservations.map((reservation) => (
          <li key={reservation.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{reservation.full_name}</strong>
              <br />
              <span>Number of Persons: {reservation.nb_person}</span>
              <br />
              <span>Start Date: {formatDate(reservation.start_date)}</span>
              <br />
              <span>End Date:{formatDate(reservation.end_date)}</span>
              <br />
              <span>Price: {reservation.price}</span>
            </div>
            <div>
              <button className="btn btn-danger" onClick={() => handleCancelReservation(reservation.id)}>
                Cancel Reservation
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


export default Cart;
