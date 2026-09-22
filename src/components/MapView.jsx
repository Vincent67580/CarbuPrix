import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { getStationName } from '../utils/getStationName';
import { getDistanceInKm } from '../utils/getDistance';
import MapRecenter from './MapRecenter';
import { FUEL_MAP } from '../constants/fuelMap';

// Fixe l'affichage des marqueurs par défaut pour la production / GitHub Pages
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Icône personnalisée pour le point de recherche / position actuelle
const userLocationIcon = L.divIcon({
  className: 'custom-user-pin',
  html: `<div style="
    background-color: #ef4444;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 8px rgba(0,0,0,0.4);
  "></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export default function MapView({ center, stations }) {
  const [isMapVisible, setIsMapVisible] = useState(true);

  return (
    <div className="map-container-section">
      <button
        className="map-toggle-btn"
        onClick={() => setIsMapVisible((prev) => !prev)}
      >
        {isMapVisible ? '🗺️ Masquer la carte' : '🗺️ Afficher la carte'}
      </button>

      {isMapVisible && (
        <div className="map-wrapper">
          <MapContainer
            center={center}
            zoom={12}
            scrollWheelZoom={false}
            className="leaflet-map"
          >
            <MapRecenter center={center} stations={stations} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Marqueur représentant la position de recherche ou de l'utilisateur */}
            {center && center.length === 2 && (
              <Marker position={center} icon={userLocationIcon}>
                <Popup>
                  <strong>📍 Votre position / Point de recherche</strong>
                </Popup>
              </Marker>
            )}

            {/* Marqueurs des stations */}
            {stations.map((station) => {
              if (!station.geom) return null;
              const [lat, lon] = station.geom;
              const stationTitle = getStationName(station);
              const fullAddress = `${station.adresse || ''}${station.cp || station.ville ? `, ${station.cp || ''} ${station.ville || ''}` : ''}`;


              const distanceText = center
                ? getDistanceInKm(center[0], center[1], lat, lon)
                : null;

              const fuelEntries = Object.keys(FUEL_MAP)
                .map((fuelId) => {
                  const fuelConfig = FUEL_MAP[fuelId];
                  const rawPrice = station[fuelConfig.priceKey];

                  if (rawPrice != null && !isNaN(Number(rawPrice))) {
                    return {
                      label: fuelConfig.name,
                      value: Number(rawPrice).toFixed(3),
                    };
                  }
                  return null;
                })
                .filter(Boolean);

              return (
                <Marker key={station.id} position={[lat, lon]}>
                  <Popup>
                    <div className="map-popup">
                      <strong>{stationTitle}</strong>
                      {distanceText && (
                        <p className="popup-distance">📍 À {distanceText}</p>
                      )}
                      <p>{fullAddress}</p>
                      <hr />
                      {fuelEntries.length > 0 ? (
                        fuelEntries.map((fuel, idx) => (
                          <p key={idx}>
                            {fuel.label} : <strong>{fuel.value} €</strong>
                          </p>
                        ))
                      ) : (
                        <p>
                          <em>Aucun prix disponible</em>
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      )}
    </div>
  );
}