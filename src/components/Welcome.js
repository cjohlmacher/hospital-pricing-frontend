import React from 'react';
import { NavLink } from 'react-router-dom';
import './Welcome.css';

const Welcome = (props) => {
    return (
        <div className="Welcome">
            <h2>Welcome to Hospital Pricing!</h2>
            <span>Hospital pricing is a resource for searching and comparing prices for common hospital procedures.</span>
            <span>Pricing is currently available for select hospitals within the state of California.</span>
            <div className="links-bar">
                <NavLink to="/hospitals">Search by Hospital</NavLink>
                <NavLink to="/procedures">Search by Procedure</NavLink>
            </div>
            <img src={require("../pexels-chokniti-khongchum-2280568.jpg")}/>
        </div>
    )
};

export default Welcome;