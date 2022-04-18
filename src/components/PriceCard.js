import React from 'react';
import './PriceCard.css';

const PriceCard = ({title='', price='', subtitle='', descriptors=[], iconImg=null, button=null }) => {
    const descriptions = descriptors.map(description => {
        return <p key="descriptor" className="descriptor">{description}</p>
    });
    return (
        <div className="PriceCard">
            {iconImg ? <img src={`../${iconImg}`} alt="" /> : null}
            <div className="title-block">
                <p>{title}</p>
                <p className="price">{price}</p>
            </div>
            {subtitle ? <p className="subtitle">{subtitle}</p> : null}
           {descriptions}
            <div className="button-bar">
                {button ? <button onClick={button.handleClick}>{button.text}</button> : null}
            </div>
        </div>
    )
};

export default PriceCard;