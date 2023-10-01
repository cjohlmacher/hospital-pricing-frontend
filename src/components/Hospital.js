import React, { useState, useEffect } from 'react';
import './Hospital.scss';
import { useParams, useNavigate } from 'react-router-dom';
import PriceCard from './PriceCard';
import Spinner from './Spinner';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import SortBar from './SortBar';
import HospitalApi from '../api';

const Hospital = (props) => {
    const { handle } = useParams();
    const [hospitalInfo, setHospitalInfo] = useState({});
    const [mapCoordinates, setMapCoordinates] = useState({lat: '51.505', long: '-0.09'});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchHospital = async (hospitalHandle) => {
        setLoading(s => true);
        try {
            const res = await HospitalApi.getHospital(hospitalHandle);
            setHospitalInfo(res);
        } catch(err) {
            navigate('/404');
        }
        setLoading(s => false);
    };

    useEffect( () => {
        fetchHospital(handle);
    },[]);

    useEffect( () => {
        const fetchGeolocation = async () => {
            try {
                const {address, city, state} = hospitalInfo;
                const location = await HospitalApi.getGeolocation({address, city, state});
                if (location.length) {
                  const {latitude: lat, longitude: long} = location[0];
                  setMapCoordinates({lat, long});
                }
            } catch (err) {
                console.error(err);
            }
        }
        if (hospitalInfo.handle) {
            fetchGeolocation()
        }
    }, [hospitalInfo])

    const hospitalHeader = (
        <div>
            {hospitalInfo ? <h4>{hospitalInfo.fullName}</h4> : null}
            {hospitalInfo ? <p className="detail">{hospitalInfo.address}</p> : null}
            {hospitalInfo ? <p className="detail">{hospitalInfo.city}, {hospitalInfo.state} {hospitalInfo.zipCode}</p> : null}
            {hospitalInfo ? <a className="external-url" href={hospitalInfo.url} target="blank">Visit Hospital Website</a> : null}
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

    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    return loading ? <Spinner /> : (
        <div className="HospitalDetail">
            <div className="header">
                {hospitalHeader}
            </div>
            <SortBar choices={['Description','Cost (low to high)', 'Cost (high to low)']} sortedName={'procedures'} selectHandler={sortBy}/>
            <div className="hospital-main">
                <div className="procedure-cards">
                    {procedureCards}
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

export default Hospital;