import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { getStationName } from '../utils/getStationName';
import MapRecenter from './MapRecenter';
import { FUEL_MAP } from '../constants/fuelMap';

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
            <MapRecenter center={center} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {stations.map((station) => {
              if (!station.geom) return null;
              const [lat, lon] = station.geom;
              const stationTitle = getStationName(station);
              const fullAddress = `${station.adresse || ''}${station.cp || station.ville ? `, ${station.cp || ''} ${station.ville || ''}` : ''}`;


              // Extraction des prix à partir du FUEL_MAP commun
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