import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Destres = () => {
  const { id } = useParams();
  
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/cities');
        const data = await response.json();

        console.log(data);
        setCityData(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching city data:', error);
      }
    };

    fetchCityData();
  }, []);

  const openModal = (city) => {
    setSelectedCity(city);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getCityInformation = (city) => {
    const { image, prices, description, duration, person, rating, reviews } = cityData.find((item) => item.name === city) || {};

    if (image && prices && description && duration && person && rating && reviews) {
      return (
        <>
          <img className="img-fluid" src={image} alt={`${city}`} />
          <div className="p-4">
            <div className="d-flex justify-content-between mb-3">
              <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />{city}</small>
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
            <h1>Perfect Tour for Africa</h1>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="row">
              {cityData.map((city) => (
                <div className="col-lg-4 col-md-6 mb-4" key={city.name}>
                  <div className="package-item bg-white mb-2" onClick={() => openModal(city.name)}>
                    <img className="img-fluid" src={city.image} alt="" />
                    <div className="p-4">
                      <div className="d-flex justify-content-between mb-3">
                        <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />{city.name}</small>
                        <small className="m-0"><i className="fa fa-calendar-alt text-primary mr-2" />{city.duration}</small>
                        <small className="m-0"><i className="fa fa-user text-primary mr-2" />{city.person}</small>
                      </div>
                      <a className="h5 text-decoration-none">{city.description}</a>
                      <div className="border-top mt-4 pt-4">
                        <div className="d-flex justify-content-between">
                          <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />{city.rating} <small>{city.reviews}</small></h6>
                          <h5 className="m-0">{city.prices}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
