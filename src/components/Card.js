import React from 'react';
import './Card.css';

const Card = ({title='', subtitle='', descriptors=[], iconImg=null, button=null }) => {
    const descriptions = descriptors.map(description => {
        return <p key="descriptor" className="descriptor">{description}</p>
    });
    return (
        <div className="Card">
            <div className="title-block">
                <h4>{title}</h4>
                {iconImg ? <img src={`../${iconImg}`} alt="" /> : null}
            </div>
            {subtitle ? <p className="subtitle">{subtitle}</p> : null}
           {descriptions}
            <div className="button-bar">
                {button ? <button onClick={button.handleClick}>{button.text}</button> : null}
            </div>
        </div>
    )
};

export default Card;