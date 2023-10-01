import React from 'react';
import {FaMapLocationDot} from "react-icons/fa6"
import './PriceCard.scss';

const PriceCard = ({title='', price='', iconImg=null, onLocationChange }) => {

    const findButton_clickHandler = (e) => {
        e.preventDefault();
        onLocationChange();
      }

    return (
        <div className="PriceCard">
            <div className="title-block">
                <h5>{title} <FaMapLocationDot onClick={findButton_clickHandler} style={{cursor: 'pointer'}}/></h5>
                {iconImg ? <img src={`../${iconImg}`} alt="" /> : null}
                <p className="descriptor">{price}</p>
            </div>
        </div>
    )
};

export default PriceCard;