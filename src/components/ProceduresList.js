import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import './ProceduresList.scss';
import HospitalApi from '../api';

const ProceduresList = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProcedures, setProcedures] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchProcedures = async () => {
        setLoading(s => true);
        const procedures = await HospitalApi.getProcedures(searchTerm);
        setProcedures(p => procedures);
        setLoading(s => false);
    };

    useEffect(() => {
        fetchProcedures();
    },[]);

    const procedureCards = filteredProcedures.map(p => {
        return (
            <Link to={`/procedures/${p.cptCode}`} key={p.cptCode}>
                <div className="procedure-card">
                    <h5>{p.description}</h5>
                </div>
            </Link>
        )
    });

    const handleChange = (e) => {
        const {value} = e.target;
        setSearchTerm(v => value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(s => true);
        fetchProcedures();
    };

    return loading ? <Spinner /> : (
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