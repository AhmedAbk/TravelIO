import React, {useState,useEffect} from 'react' 
import { Link } from 'react-router-dom'
function Pack() {
  
  return (
    <div>
    {/* Packages Start */}
    <div className="container-fluid py-5">
      <div className="container pt-5 pb-3">
        <div className="text-center mb-3 pb-3">
          <h6 className="text-primary text-uppercase" style={{letterSpacing: '5px'}}>Packages</h6>
          <h1>Perfect Tour Packages</h1>
        </div>
        <div className="row">
        
          <div className="col-lg-4 col-md-6 mb-4">
      <Link to="/paris">
        <div className="package-item bg-white mb-2">
          <img className="img-fluid" src="./src/assets/img/france.jpg" alt="" />
          <div className="p-4">
            <div className="d-flex justify-content-between mb-3">
              <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-2" />Paris</small>
              <small className="m-0"><i className="fa fa-calendar-alt text-primary mr-2" />3 days</small>
              <small className="m-0"><i className="fa fa-user text-primary mr-2" />2 Person</small>
            </div>
            <div className="h5 text-decoration-none">Discover amazing places of the world with us</div>
            <div className="border-top mt-4 pt-4">
              <div className="d-flex justify-content-between">
                <h6 className="m-0"><i className="fa fa-star text-primary mr-2" />4.5 <small>(250)</small></h6>
                <h5 className="m-0">$350</h5>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>

        </div>
      </div>
    </div>
    {/* Packages End */}
     

    </div>
  )
}

export default Pack