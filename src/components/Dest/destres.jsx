import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Destres = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/cities/${id}`);
        const data = await response.json();

        console.log(id);
        console.log(data);

        if (response.ok) {
          setDestination(data);
        } else {
          setError(`Error: ${data.message || 'Failed to fetch'}`);
        }
      } catch (error) {
        setError(`Error fetching destination: ${error.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [id]);

  const openModal = (city) => {
    setShowModal(true);
    setSelectedCity(city);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCity(null);
  };

  const getCityInformation = (city) => {
    const { image, prices, description, duration, person, rating, reviews, name } = destination || {};

    if (image && prices && description && duration && person && rating && reviews) {
      return (
        <>
          <img className="img-fluid" src={image} alt={`${name}`} />
          <div className="p-4">
            <div className="d-flex justify-content-between mb-3">
              <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />{name}</small>
              <small className="m-0"><i className="fa fa-calendar-alt text-primary mr-2" />{duration}</small>
              <small className="m-0"><i className="fa fa-user text-primary mr-2" />{person}</small>
            </div>
            <a className="h5 text-decoration-none">{description}</a>
            <div className="border-top mt-4 pt-4">
              <div className="d-flex justify-content-between">
                <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />{rating} <small>{reviews}</small></h6>
                <h5 className="m-0">{prices}</h5>
              </div>
            </div>
          </div>

          <Link to="/Login">
            <button className="btn btn-primary">Book Now</button>
          </Link>
        </>
      );
    } else {
      return `Information about ${city}.`;
    }
  };

  return (
    <div>
      {/* Packages Start */}
      <div className="container-fluid py-5">
        <div className="container pt-5 pb-3">
          <div className="text-center mb-3 pb-3">
            <h6 className="text-primary text-uppercase" style={{ letterSpacing: '5px' }}>Packages</h6>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="row">
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="package-item bg-white mb-2" onClick={() => openModal(destination.data.name)}>
                  <img className="img-fluid" src={destination.data.image} alt="" />
                  <div className="p-4">
                    <div className="d-flex justify-content-between mb-3">
                      <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />{destination.data.name}</small>
                      <small className="m-0"><i className="fa fa-calendar-alt text-primary mr-2" />{destination.data.duration}</small>
                      <small className="m-0"><i className="fa fa-user text-primary mr-2" />{destination.data.person}</small>
                    </div>
                    <a className="h5 text-decoration-none">{destination.data.description}</a>
                    <div className="border-top mt-4 pt-4">
                      <div className="d-flex justify-content-between">
                        <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />{destination.data.rating} <small>{destination.data.reviews}</small></h6>
                        <h5 className="m-0">{destination.data.prices}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Packages End */}

      {/* Modal Start */}
      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block', background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedCity} Information</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {getCityInformation(selectedCity)}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal End */}
    </div>
  );
};

export default Destres;
