'use client';

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from 'leaflet';


interface HistoricalEvent {
    id: number;
    title: string;
    description: string;
    position: [number, number];
    category: string;
}

const eventsData: HistoricalEvent[] = [
    {
        id: 1,
        title: "D-Day Commences!",
        description: "Allied Forces landed in Normany on June 6, 1944!",
        position: [49.4144, -0.8322],
        category: "War"
    },
    {
        id: 1,
        title: "Italia is Reunited!",
        description: "Garibaldi and the Baguettes strike back once again!!",
        position: [49.9029, 12.4545],
        category: "Art"
    }
];




const defaultPosition: [number, number] = [51.505, -0.09]

function MapsApp() {
    const icon: Icon = new Icon ({
        iconUrl: 'marker.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41]

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
                            <h1 className = "text-center">{event.title}</h1>
                            <i>{event.description}</i>
                        </Popup>
                    </Marker>
                    )
                    
                })
            }

            <Marker position={defaultPosition} icon = {icon}>
              <Popup>
                Beepoo <br /> I love pop ups!!!!!!!!!!
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        
      </div>
    </div>
  )
}

export default MapsApp
