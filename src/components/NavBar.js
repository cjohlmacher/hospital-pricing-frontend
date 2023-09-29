import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.scss';

const NavBar = (props) => {
    return (
        <div className="NavBar">
            <div>
                <Link to="/">Hospital Pricing</Link>
            </div>
            <div>
                <Link to="/hospitals">Hospitals</Link>
                <Link to="/procedures">Procedures</Link>
            </div>
        </div>
    )
};

export default NavBar;