import React from "react";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { Map, TileLayer } from "react-leaflet";

import 'leaflet/dist/leaflet.css'

import mapmarkerImg from "../images/map-marker.svg";
import './../styles/pages/orphanages-map.css'


function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapmarkerImg} alt="Happy" ></img>
                    
                    <h2>
                        Escolha um orfanato no mapa
                    </h2>
                    <p>Muitaws crianças estão esperando a sua visita :)</p>
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
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus  size={32} color="#FFF"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;