'use client';

import React, {useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';
import eventsData from './historyEvents';


export interface HistoricalEvent {
    id: number;
    title: string;
    description: string;
    position: [number, number];
    category: string;
}





const defaultPosition: [number, number] = [51.505, -0.09]

const emptyStar = <i className = "fa-regular fa-star">✰</i>;
const fullStar = <i className = "fa-solid fa-star">⭐</i>

function MapsApp() {
    const icon: Icon = new Icon ({
        iconUrl: 'marker.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    })

    const [favorites, setFavorites] = useState<number[]>(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : []
    })

  return (
    <div className = "content" >
      <div className = "flex flex-col">
        <div className ="h-12"></div>
        <div style={{ padding: "20px"}}>
          <MapContainer
            center={defaultPosition}
            zoom={13}
            style={{
              height: "100vh",
              width: "calc(100vw - 40px)", // Subtract the padding from the width
              maxWidth: "100%", // Ensure it doesn't overflow the screen width
            }}
            className="map-container"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {
                eventsData.map((event) => {
                    return (
                    <Marker position={event.position} icon = {icon}>
                        <Popup>
                            <h1 className = "text-center text-base font-medium">{event.title}</h1>
                            <i>{event.description}</i>
                            <br></br>
                            <div className = "flex items-center justify-center" >
                                <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
                                    <span className = "px-2">
                                        {emptyStar}
                                    </span>
                                    Favorite
                                </button>
                            </div>
                            
                        </Popup>
                    </Marker>
                    )  
                })
            }
          </MapContainer>
        </div>
        
      </div>
    </div>
  )
}

export default MapsApp
