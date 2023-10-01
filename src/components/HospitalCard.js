import React from 'react';
import './HospitalCard.scss';
import {FaMapLocationDot} from "react-icons/fa6"

const HospitalCard = (props) => {
  const {hospital, onLocationChange} = props;

  const findButton_clickHandler = (e) => {
    e.preventDefault();
    onLocationChange();
  }

  const url_clickHandler = (e) => {
    e.preventDefault();
    hospital.url && window.open(hospital.url, '_blank');
  }
  
  return hospital ? (
      <div className="hospital-card">
        <div className="title-block">
          <h5>{hospital.fullName}</h5>
          {hospital.logo ? <img src={`../${hospital.logo}`} alt="" /> : null}
          <FaMapLocationDot onClick={findButton_clickHandler} />
        </div>
        <p className="descriptor">{hospital.address}</p>
        <p className="descriptor">{hospital.city}, {hospital.state} {hospital.zipCode}</p>
        <p className="descriptor" onClick={url_clickHandler}>{hospital.url}</p>
      </div>
  ) : null
};

export default HospitalCard;