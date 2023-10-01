import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HospitalsList.scss';
import HospitalApi from '../api';
import HospitalCard from './HospitalCard';
import Spinner from './Spinner';
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';

const HospitalsList = (props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredHospitals, setHospitals] = useState([]);
    const [mapCoordinates, setMapCoordinates] = useState({lat: '51.505', long: '-0.09'})
    const [loading, setLoading] = useState(true);

    const fetchHospitals = async () => {
        setLoading(s => true);
        const hospitals = await HospitalApi.getHospitals(searchTerm);
        setHospitals(h => hospitals);
        setLoading(s => false);
    }
    
    useEffect(() => {
        fetchHospitals();
    },[]);

    useEffect(() => {
        if (filteredHospitals.length) {
            loadLocation(filteredHospitals[0]);
        }
    },[filteredHospitals])

    const hospitalCards = filteredHospitals.map(h => {
        return (
            <Link to={`/hospitals/${h.handle}`} key={h.handle}>
                <HospitalCard 
                  key={h.handle} 
                  hospital={h} 
                  linkTarget={`hospitals/${h.handle}`}
                  onLocationChange={() => loadLocation(h)}/>
            </Link>
        )
    });

    const handleChange = (e) => {
        const {value} = e.target;
        setSearchTerm(v => value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchHospitals();
    };

    const loadLocation = async (hospital) => {
        try {
            const {address, city, state} = hospital;
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

    return (
        loading ? <Spinner /> : <div className="HospitalList">
            <form onSubmit={handleSubmit}>
                <label name="search-term"></label>
                <input type="text" placeholder="Search for hospital..." name="search-term" value={searchTerm} onChange={handleChange}/>
                <button>Search</button>
            </form>
            <div className="hospitals-main">
                <div className="hospital-cards">
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

export default HospitalsList;