import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Procedure.scss';
import PriceCard from './PriceCard';
import SortBar from './SortBar';
import HospitalApi from '../api';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

const Procedure = (props) => {
    const { code } = useParams();
    const [procedureInfo, setProcedureInfo] = useState({});
    const [mapCoordinates, setMapCoordinates] = useState({lat: '51.505', long: '-0.09'})
    const navigate = useNavigate();

    useEffect( () => {
        const fetchProcedure = async (procedureCode) => {
            try {
                const res = await HospitalApi.getProcedure(procedureCode);
                setProcedureInfo(res);
            } catch(err) {
                navigate('/404');
            }
        };
        fetchProcedure(code);
    },[]);

    const procedureHeader = (
        <div>
            {procedureInfo ? <div><h4>Selected Procedure:</h4><h3> {procedureInfo.description}</h3></div> : null}
        </div>
    );

    const handleLocationClick = async (hospitalHandle) => {
        try {
            const {address, city, state} = await HospitalApi.getHospital(hospitalHandle);
            const location = await HospitalApi.getGeolocation({address, city, state});
            if (location.length) {
              const {latitude: lat, longitude: long} = location[0];
              setMapCoordinates({lat, long});
            }
        } catch (err) {
            console.error(err);
        }
    }

    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    let hospitalCards;
    if (Object.keys(procedureInfo).length !== 0) {
        hospitalCards = procedureInfo.hospitalCosts.map(c => {
            return <PriceCard key={c.hospitalHandle} 
                        title={c.hospitalName} 
                        price={`$${c.cost}`}
                        descriptors={[]}
                        button={{handleClick: () => handleLocationClick(c.hospitalHandle), text: 'Find'}}
                    />
        });
    };

    const sortBy = (sortOption) => {
        const sortedHospitalCosts = [...procedureInfo.hospitalCosts]
        if (sortOption === 'Name') {
            sortedHospitalCosts.sort( (a,b) => {
                return a.hospitalName.localeCompare(b.hospitalName);
            });
        } else if (sortOption === 'Cost (low to high)') {
            sortedHospitalCosts.sort( (a,b) => {
                return a.cost - b.cost;
            })
        } else if (sortOption === 'Cost (high to low)') {
            sortedHospitalCosts.sort( (a,b) => {
                return b.cost - a.cost;
            })
        };
        setProcedureInfo(p => {
            return {
                ...p,
                hospitalCosts: sortedHospitalCosts
            };
        });
    };

    return (
        <div className="ProcedureDetail">
            <div className="header">
                {procedureHeader}
            </div>
            <SortBar choices={['Name','Cost (low to high)', 'Cost (high to low)']} sortedName={'hospitals'} selectHandler={sortBy}/>
            <div className="procedures-main">
                <div className="procedure-cards">
                    {hospitalCards}
                </div>
                <div className="map-panel">
                    <div id="map">
                        <MapContainer 
                            center={[mapCoordinates.lat, mapCoordinates.long]} 
                            zoom={12} 
                            scrollWheelZoom={false}
                            style={{width: '300px', height: '300px'}}>
                                <ChangeView center={[mapCoordinates.lat, mapCoordinates.long]} zoom={12} /> 
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <Marker position={[mapCoordinates.lat, mapCoordinates.long]}>
                                </Marker>
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Procedure;