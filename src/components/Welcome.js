import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import HospitalApi from '../api';
import './Welcome.scss';

const Welcome = (props) => {
    // Make an arbitrary call to backend so that server spins up
    const spinUpBackendServer = async () => {
      await HospitalApi.getHospitals('Kaiser');
    };

    useEffect(() => {
      spinUpBackendServer();
    },[]);

    return (
        <div className="Welcome">
            <h2>Welcome to Hospital Pricing!</h2>
            <span>Hospital pricing is a resource for searching and comparing prices for common hospital procedures.</span>
            <span>Pricing is currently available for the year 2021 for select hospitals within the state of California.</span>
            <div className="links-bar">
                <NavLink to="/hospitals">Search by Hospital</NavLink>
                <NavLink to="/procedures">Search by Procedure</NavLink>
            </div>
            <img src={require("../pexels-chokniti-khongchum-2280568.jpg")} alt="Gloved Hands Holding Sphere"/>
        </div>
    )
};

export default Welcome;