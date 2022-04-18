import React, { useState, useEffect } from 'react';
import './Hospital.css';
import { useParams, useHistory } from 'react-router-dom';
import PriceCard from './PriceCard';
import HospitalApi from '../api';

const Hospital = (props) => {
    const { handle } = useParams();
    const [hospitalInfo, setHospitalInfo] = useState({});
    const history = useHistory();

    useEffect( () => {
        const fetchHospital = async (hospitalHandle) => {
            try {
                const res = await HospitalApi.getHospital(hospitalHandle);
                setHospitalInfo(res);
            } catch(err) {
                history.push('/404');
            }
        };
        fetchHospital(handle);
    },[]);

    const hospitalHeader = (
        <div>
            {hospitalInfo ? <h4>{hospitalInfo.fullName}</h4> : null}
            {hospitalInfo ? <a className="external-url" href={hospitalInfo.url} target="blank">{hospitalInfo.url}</a> : null}
        </div>
    );

    let procedureCards;
    if (Object.keys(hospitalInfo).length !== 0) {
        procedureCards = hospitalInfo.procedureCosts.map(c => {
            return <PriceCard key={c.cptCode} 
                        title={c.procedureDescription} 
                        price={`$${c.cost}`}
                        descriptors={[]}
                    />
        });
    };

    return (
        <div className="HospitalDetail">
            <div className="header">
                {hospitalHeader}
            </div>
            <div className="procedure-cards">
                {procedureCards}
            </div>
        </div>
    )
};

export default Hospital;