import React from 'react';
import './HospitalCard.scss';

const HospitalCard = (props) => {
  const {hospital, onLocationChange} = props;

  const findButton_clickHandler = (e) => {
    e.preventDefault();
    onLocationChange();
  }
  
  return hospital ? (
      <div className="hospital-card">
        <div className="title-block">
          <h5>{hospital.fullName}</h5>
          {hospital.logo ? <img src={`../${hospital.logo}`} alt="" /> : null}
          <button onClick={findButton_clickHandler}>Find</button>
        </div>
        <p className="descriptor">{hospital.address}</p>
        <p className="descriptor">{hospital.city}, {hospital.state} {hospital.zipCode}</p>
        <p className="descriptor">{hospital.url}</p>
      </div>
  ) : null
};

export default HospitalCard;