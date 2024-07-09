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
    });
    const [activeEvent, setActiveEvent] = useState<HistoricalEvent | null> (null)


    const handleFavoriteClick = (eventId: number) => {
        let updatedFavorites: number[] = favorites.filter((id) => id !== eventId);

        if (!favorites.includes(eventId)) {
            updatedFavorites = [eventId, ...updatedFavorites];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }

  return (
    <div className="content flex flex-row">
  <div className="flex-grow">
    <MapContainer
      center={defaultPosition}
      zoom={13}
      style={{
        height: "100vh",
        width: "100%",
      }}
      className="map-container"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {eventsData.map((event) => (
        <Marker
          position={event.position}
          icon={icon}
          eventHandlers={{
            click: () => {
              setActiveEvent(event);
            },
          }}
        >
          <Popup>
            <h1 className="text-center text-base font-medium">{event.title}</h1>
            <i>{event.description}</i>
            <br />
            <div className="flex items-center justify-center">
              <button
                onClick={() => handleFavoriteClick(event.id)}
                className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
              >
                <span className="px-2">
                  {favorites.includes(event.id) ? fullStar : emptyStar}
                </span>
                Favorite
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  </div>

  <div className="w-1/4 h-full text-gray-200 items-center text-center">
    <h1 className = "text-gray-200 text-leading text-lg pb-3 text-underline">{favorites.length} Favorite Events</h1>
    {favorites.map((favorite) => {
        return eventsData.find((event) => event.id === favorite);
    }).map((event) => {
        return <li className = "py-1 px-2" key = {event?.id}>{event?.title} <i>({event?.category})</i></li>
    })
    
    }
    </div>
    </div>
  )
}

export default MapsApp
