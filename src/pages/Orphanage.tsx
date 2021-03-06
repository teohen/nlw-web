import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";



import '../styles/pages/orphanage.css';
import Sidebar from "../components/Sidebar";
import mapIcon from "../util/mapIcon";
import { useState } from "react";
import { useEffect } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";


interface Orphanage {
  id: number,
  latitude: number,
  longitude: number,
  name: string,
  about: string,
  instructions: string,
  opening_hours: string,
  open_on_weekends: string
  images: Array<{
    url: string,
  }>
}

interface OrphanagesParams {
  id: string
}

export default function Orphanage() {

  const [orphanage, setOrphanage] = useState<Orphanage>()

  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const params = useParams<OrphanagesParams>()


  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanage(response.data)
    })
  }, [params.id])


  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage?.images[activeImageIndex].url} alt={orphanage?.name} />

          <div className="images">
           { orphanage?.images.map(((img , index)=> {
             return (
              <button  key={String(img)} onClick={() => {
                setActiveImageIndex(index)
              }} 
              className={activeImageIndex === index ? "active" : ''}
                type="button">
                <img src={img.url} alt={orphanage.name} key={String(img)} />
              </button>
             )
           })) }
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage?.name}</h1>
            <p>{orphanage?.about}</p>

            <div className="map-container">
              <Map 
                center={[-2.531089,-44.2384228]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker interactive={false} icon={mapIcon} position={[-2.531089,-44.2384228]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude}, ${orphanage?.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
              <p>{orphanage?.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage?.opening_hours}
              </div>
              { orphanage?.open_on_weekends ? (
                <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos <br />
                fim de semana
                </div>)
              : 
              (<div className="open-on-weekends dont-open">
              <FiInfo size={32} color="#FF669D" />
              Não atendemos <br />
              fim de semana
              </div>) 
            }
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}