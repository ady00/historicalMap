"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import MapsApp from "./Components/MapsApp"
import dynamic from 'Next/dynamic'



const defaultPosition: [number, number] = [51.505, -0.09]

export default function Home() {
  return (
    <main className = 'w-full h-full'>
      <MapsApp />
    </main>
  );
}
