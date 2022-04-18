import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './Procedure.css';
import PriceCard from './PriceCard';
import HospitalApi from '../api';

const Procedure = (props) => {
    const { code } = useParams();
    const [procedureInfo, setProcedureInfo] = useState({});
    const history = useHistory();

    useEffect( () => {
        const fetchProcedure = async (procedureCode) => {
            try {
                const res = await HospitalApi.getProcedure(procedureCode);
                setProcedureInfo(res);
            } catch(err) {
                history.push('/404');
            }
        };
        fetchProcedure(code);
    },[]);

    const procedureHeader = (
        <div>
            {procedureInfo ? <div><h4>Selected Procedure:</h4><h3> {procedureInfo.description}</h3></div> : null}
        </div>
    );

    let hospitalCards;
    if (Object.keys(procedureInfo).length !== 0) {
        hospitalCards = procedureInfo.hospitalCosts.map(c => {
            return <PriceCard key={c.hospitalHandle} 
                        title={c.hospitalName} 
                        price={`$${c.cost}`}
                        descriptors={[]}
                    />
        });
    };

    return (
        <div className="HospitalDetail">
            <div className="header">
                {procedureHeader}
            </div>
            <div className="procedure-cards">
                {hospitalCards}
            </div>
        </div>
    )
};

export default Procedure;