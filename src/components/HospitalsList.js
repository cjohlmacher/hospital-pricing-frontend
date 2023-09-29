import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './HospitalsList.css';
import HospitalApi from '../api';
import HospitalCard from './HospitalCard';

const HospitalsList = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredHospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (!loading) {
            return
        };
        const fetchHospitals = async () => {
            const hospitals = await HospitalApi.getHospitals(searchTerm);
            setHospitals(h => hospitals);
            setLoading(s => false);
        };
        fetchHospitals();
    },[loading]);

    const hospitalCards = filteredHospitals.map(h => {
        return (
            <NavLink to={`hospitals/${h.handle}`} key={h.handle}>
                <HospitalCard key={h.handle} hospital={h} linkTarget={`hospitals/${h.handle}`}/>
            </NavLink>
        )
    });

    const handleChange = (e) => {
        const {value} = e.target;
        setSearchTerm(v => value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(s => true);
    };

    return (
        <div className="HospitalList">
            <form onSubmit={handleSubmit}>
                <label name="search-term"></label>
                <input type="text" placeholder="Search for hospital..." name="search-term" value={searchTerm} onChange={handleChange}/>
                <button>Search</button>
            </form>
            <div className="hospital-display">
              {hospitalCards}
            </div>
        </div>
    )
};

export default HospitalsList;