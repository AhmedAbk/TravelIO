import React from 'react';
import { Link } from 'react-router-dom';


function Nav() {
  return (
    <div>
      {/* Navbar Start */}
      <div className="container-fluid position-relative nav-bar p-0">
        <div className="container-lg position-relative p-0 px-lg-3" style={{ zIndex: 9 }}>
          <nav className="navbar navbar-expand-lg bg-light navbar-light shadow-lg py-3 py-lg-0 pl-3 pl-lg-5">
            <Link to="/" className="navbar-brand">
              <h1 className="m-0 text-primary">
                <span className="text-dark">TRAVEL</span>IO
              </h1>
            </Link>

            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse justify-content-between px-3" id="navbarCollapse">
              <ul className="navbar-nav ml-auto py-0">
                <li className="nav-item nav-link">
                  <Link to="/Res">Reservation</Link>
                </li>  
                <li className="nav-item nav-link">
                  <Link to="/Cart">
                    Cart
                  </Link>
                </li>
                <li className="nav-item nav-link">
                  <Link to="/Pack">Packages</Link>
                </li>
                <li className="nav-item nav-link">
                  <Link to="/Dest">Destination</Link>
                </li>
                <li className="nav-item nav-link">
                  <Link to="/Login">Login</Link>
                </li>
            
              </ul>
            </div>
          </nav>
        </div>
      </div>
      {/* Navbar End */}
    </div>
  );
}

export default Nav;
