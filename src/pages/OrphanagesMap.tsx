import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiArrowRight } from "react-icons/fi";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import 'leaflet/dist/leaflet.css'

import mapmarkerImg from "../images/map-marker.svg";
import './../styles/pages/orphanages-map.css'
import mapIcon from "../util/mapIcon";
import api from "../services/api";

interface Orphanage {
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

function OrphanagesMap() {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get(`orphanages`).then(response => {
            console.log(response.data)
            setOrphanages(response.data)
        })
    }, [])


    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapmarkerImg} alt="Happy" ></img>
                    
                    <h2>
                        Escolha um orfanato no mapa
                    </h2>
                    <p>Muitas crianças estão esperando a sua visita</p>
                </header>
                <footer>
                    <strong>São Luís</strong>
                    <span>Maranhão</span>
                </footer>
            </aside>

            <Map center={[-2.531089,-44.2384228]} zoom={15} style={{
                width: '100%',
                height: '100%'
            }}>
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {
                orphanages.map(orphanages => {
                    return (
                    <Marker
                        icon={mapIcon}
                        position={[orphanages.latitude,orphanages.longitude]}
                        >
                        <Popup
                        closeButton={false}
                        minWidth={240}
                        maxWidth={240}
                        className="map-popup"
                        key={orphanages.id}
                        >
                            {orphanages.name}
                            <Link to={`orphanages/`+orphanages.id}>
                                <FiArrowRight size={20} color="#fff" />
                            </Link>
                        </Popup>
                    </Marker>)
                })
            }
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus  size={32} color="#FFF"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;