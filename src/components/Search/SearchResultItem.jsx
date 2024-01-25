import React from 'react';

const SearchResultItem = ({ city, description }) => {
  return (
    <div className='row'>
        
      {/* Modal End */}
      <div className="col-lg-4 col-md-6 mb-2 mx-auto "> {/* Center the div with mx-auto */}
        <div className="package-item bg-white mb-2" >
          {/* You can replace the image source with a dynamic one based on the city */}
          <img className="img-fluid" src={`./src/assets/img/${city.toLowerCase()}.jpg`} alt="" />
          <div className="p-2"> {/* Smaller padding for a more compact appearance */}
            <div className="d-flex justify-content-between mb-2" > {/* Smaller margin-bottom for a more compact appearance */}
              <small className="m-0"><i className="fa fa-map-marker-alt text-primary mr-1" />{city}</small> 
            </div>
            <a className="h6 text-decoration-none" href>{description}</a> {/* Use h6 for a smaller heading */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultItem;
