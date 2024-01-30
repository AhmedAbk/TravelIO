import React, { useEffect, useState } from 'react';

function GetAllDestinations() {
  const [destinations, setDestinations] = useState([]);
  const [editDestination, setEditDestination] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/alldestinations');
        if (response.ok) {
          const data = await response.json();
          setDestinations(data);
        } else {
          console.error('Error:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchDestinations();
  }, []);

  const handleDelete = async (destid) => {
    try {
      const response = await fetch(`http://localhost:3001/api/alldestinations/${destid}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setDestinations((prevDestinations) => prevDestinations.filter((dest) => dest.destid !== destid));
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleEdit = (destid) => {
    const destinationToEdit = destinations.find((dest) => dest.destid === destid);
    setEditDestination(destinationToEdit);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditDestination(null);
  };

  const handleModalSave = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/alldestinations/${editDestination.destid}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editDestination),
      });

      if (response.ok) { 
        setDestinations((prevDestinations) =>
          prevDestinations.map((dest) => (dest.destid === editDestination.destid ? editDestination : dest))
        );
 
        setShowModal(false);
        setEditDestination(null);
      } else {
        console.error('Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleInputChange = (e) => { 
    const { name, value } = e.target;
    setEditDestination((prevEditDestination) => ({ ...prevEditDestination, [name]: value }));
  };

  return (
    <div className="container mt-4">
       <h2 className="mb-4">All Destinations</h2>
      <ul className="list-group">
        {destinations.map((destination) => (
          <li key={destination.destid} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{destination.destname}</strong>
              <br />
              <img src={destination.destimg} alt={destination.destname} className="img-fluid" style={{ maxWidth: '200px' }} />
            </div>
            <div>
              <button
                className="btn btn-danger mr-2"
                onClick={() => handleDelete(destination.destid)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleEdit(destination.destid)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-content"> 
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="destname">Destination Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="destname"
                      name="destname"
                      value={editDestination.destname}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="destimg">Destination Image URL</label>
                    <input
                      type="text"
                      className="form-control"
                      id="destimg"
                      name="destimg"
                      value={editDestination.destimg}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* Add other fields as needed */}
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleModalSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GetAllDestinations;
