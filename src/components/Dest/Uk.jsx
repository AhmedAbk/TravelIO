import React,{useState} from 'react'
import { Link } from 'react-router-dom';
function Uk() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const openModal = (city) => {
    setSelectedCity(city);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const getCityInformation = (city) => { 
    const cityData = {
      London: {
        image: "./src/assets/img/united kingdom.jpg",
        prices: "$350 per person",
        description: "Discover amazing places of the world with us.",
        duration: "3 days",
        person: "2 Person",
        rating: "4.5",
        reviews: "(250)"
 
      },
      York: {
        image: "./src/assets/img/york.jpg",
        prices: "$300 per person",
        description: "Discover amazing places of the world with us.",
        duration: "3 days",
        person: "2 Person",
        rating: "4.5",
        reviews: "(250)"
     
      }
    };
  
    const { image, prices, description, duration, person, rating, reviews} = cityData[city] || {};
  
    if (image && prices && description && duration && person &&rating && reviews ) {
      return (
        <>
        <img className="img-fluid" src={image} alt={`${city}`} />
        <div className="p-4">
          <div className="d-flex justify-content-between mb-3">
            <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />{city}</small>
            <small className="m-0"><i className="fa fa-calendar-alt text-primary mr-2" />{duration}</small>
            <small className="m-0"><i className="fa fa-user text-primary mr-2" />{person}</small>
          </div>
          <a className="h5 text-decoration-none" href>{description}</a>
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
    <div>  {/* Packages Start */}
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <div className="text-center mb-3 pb-3">
          <h6 className="text-primary text-uppercase" style={{letterSpacing: '5px'}}>Packages</h6>
          <h1>Perfect Tour for United Kingdom  </h1>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="package-item bg-white mb-2" onClick={() => openModal('London')}>
              <img className="img-fluid" src="./src/assets/img/united kingdom.jpg" alt="" />
              <div className="p-4">
                <div className="d-flex justify-content-between mb-3">
                  <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />London</small>
                  <small className="m-0"><i className="fa fa-calendar-alt text-primary mr-2" />3 days</small>
                  <small className="m-0"><i className="fa fa-user text-primary mr-2" />2 Person</small>
                </div>
                <a className="h5 text-decoration-none" href>Discover amazing places of the world with us</a>
                <div className="border-top mt-4 pt-4">
                  <div className="d-flex justify-content-between">
                    <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />4.5 <small>(250)</small></h6>
                    <h5 className="m-0">$350</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="package-item bg-white mb-2" onClick={() => openModal('York')}>
              <img className="img-fluid" src="./src/assets/img/york.jpg" alt="" />
              <div className="p-4">
                <div className="d-flex justify-content-between mb-3">
                  <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />York</small>
                  <small className="m-0"><i className="fa fa-calendar-alt text-primary mr-2" />3 days</small>
                  <small className="m-0"><i className="fa fa-user text-primary mr-2" />2 Person</small>
                </div>
                <a className="h5 text-decoration-none" href>Discover amazing places of the world with us</a>
                <div className="border-top mt-4 pt-4">
                  <div className="d-flex justify-content-between">
                    <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />4.5 <small>(250)</small></h6>
                    <h5 className="m-0">$350</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      </div>
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
    {/* Packages End */}</div>
  )
}

export default Uk