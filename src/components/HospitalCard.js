import React from 'react';
import './HospitalCard.css';

const HospitalCard = (props) => {
  const {hospital} = props;
  
  return hospital ? (
      <div className="hospital-card">
        <div className="title-block">
          <h5>{hospital.fullName}</h5>
          {hospital.logo ? <img src={`../${hospital.logo}`} alt="" /> : null}
        </div>
        <p className="descriptor">{hospital.address}</p>
        <p className="descriptor">{hospital.city}, {hospital.state} {hospital.zipCode}</p>
        <p className="descriptor">{hospital.url}</p>
      </div>
  ) : null
};

export default HospitalCard;