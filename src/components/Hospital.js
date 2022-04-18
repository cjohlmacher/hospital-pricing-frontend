import React, { useState, useEffect } from 'react';
import './Hospital.css';
import { useParams, useHistory } from 'react-router-dom';
import PriceCard from './PriceCard';
import SortBar from './SortBar';
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
            {hospitalInfo ? <p className="detail">{hospitalInfo.address}</p> : null}
            {hospitalInfo ? <p className="detail">{hospitalInfo.city}, {hospitalInfo.state} {hospitalInfo.zipCode}</p> : null}
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

    const sortBy = (sortOption) => {
        const sortedProcedureCosts = [...hospitalInfo.procedureCosts]
        if (sortOption === 'Description') {
            sortedProcedureCosts.sort( (a,b) => {
                return a.procedureDescription.localeCompare(b.procedureDescription);
            });
        } else if (sortOption === 'Cost (low to high)') {
            sortedProcedureCosts.sort( (a,b) => {
                return a.cost - b.cost;
            })
        } else if (sortOption === 'Cost (high to low)') {
            sortedProcedureCosts.sort( (a,b) => {
                return b.cost - a.cost;
            })
        };
        setHospitalInfo(h => {
            return {...h,
            procedureCosts: sortedProcedureCosts
            };
        });
    };

    return (
        <div className="HospitalDetail">
            <div className="header">
                {hospitalHeader}
            </div>
            <SortBar choices={['Description','Cost (low to high)', 'Cost (high to low)']} sortedName={'procedures'} selectHandler={sortBy}/>
            <div className="procedure-cards">
                {procedureCards}
            </div>
        </div>
    )
};

export default Hospital;