import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
    return (
        <div className="NavBar">
            <div>
                <NavLink to="/">Hospital Pricing</NavLink>
            </div>
            <div>
                <NavLink to="/hospitals">Hospitals</NavLink>
                <NavLink to="/procedures">Procedures</NavLink>
            </div>
        </div>
    )
};

export default NavBar;