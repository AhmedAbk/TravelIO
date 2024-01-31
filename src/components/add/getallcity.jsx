import React, { useEffect, useState } from 'react';

function GetAllcity() {
  const [city, setcity] = useState([]); 

  useEffect(() => {
    const fetchcity = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/allcity');
        if (response.ok) {
          const data = await response.json();
          setcity(data);
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching city:', error.message);
      }
    };

    fetchcity();
  }, []);

  const handleDelete = async (destid) => {
    try {
      const response = await fetch(`http://localhost:3001/api/allcity/${destid}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setcity((prevcity) => prevcity.filter((dest) => dest.destid !== destid));
      } else {
        console.error('Error deleting city:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
 
 

  return (
    <div className="container mt-4">
      <h2 className="mb-4">All city</h2>
      <ul className="list-group">
        {city.map((city) => (
          <li key={city.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{city.name}</strong>
              <br />
              <img src={city.image} alt={city.name} className="img-fluid" style={{ maxWidth: '200px' }} />
            </div>
            <div>
              <button className="btn btn-danger mr-2" onClick={() => handleDelete(city.id)}>
                Delete
              </button>
             
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default GetAllcity;
