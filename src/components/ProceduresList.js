import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './ProceduresList.css';
import HospitalApi from '../api';
import Card from './Card';

const ProceduresList = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProcedures, setProcedures] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (!loading) {
            return
        };
        const fetchProcedures = async () => {
            const procedures = await HospitalApi.getProcedures(searchTerm);
            setProcedures(p => procedures);
            setLoading(s => false);
        };
        fetchProcedures();
    },[loading]);

    const procedureCards = filteredProcedures.map(p => {
        return (
            <NavLink to={`procedures/${p.cptCode}`} key={p.cptCode}>
                <Card key={p.cptCode} title={p.description} subtitle={`CPT code: ${p.cptCode}`} descriptors={[]} linkTarget={`procedures/${p.cptCode}`}/>
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
        <div className="ProceduresList">
            <form onSubmit={handleSubmit}>
                <label name="search-term"></label>
                <input type="text" placeholder="Search for procedure..." name="search-term" value={searchTerm} onChange={handleChange}/>
                <button>Search</button>
            </form>
            {procedureCards}
        </div>
    )
};

export default ProceduresList;