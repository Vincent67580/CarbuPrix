import React from 'react';
import { getStationName } from '../utils/getStationName';
import { getFuelData } from '../utils/fuelHelpers';
import { getDistanceInKm } from '../utils/getDistance';
import { getNavigationUrl } from '../utils/navigationUtils';

export default function StationCard({ station, activeSortFuel, center }) {
  if (!station) return null;
  
  const stationTitle = getStationName(station);
  const { available, tempOutOfStock, defOutOfStock } = getFuelData(station);

  const fullAddress = `${station.adresse || ''}${station.cp || station.ville ? `, ${station.cp || ''}${station.ville || ''}` : ''}`;

  // Récupération des coordonnées pour la distance et le GPS
  // L'API OpenData retourne souvent [latitude, longitude] dans `geom`
  const lat = station.geom?.[0] || station.latitude;
  const lon = station.geom?.[1] || station.longitude;

  // Calcul de la distance
  const distanceText =
    center && lat && lon
      ? getDistanceInKm(center[0], center[1], lat, lon)
      : null;

  // URL du GPS
  const navUrl = lat && lon ? getNavigationUrl(lat, lon) : null;

  return (
    <div className="station-card">
      <div className="station-header">
        <div className="station-title">
          <h2>{stationTitle}</h2>
          <span className="station-address">{fullAddress}</span>
        </div>

        <div className="station-actions">
          {distanceText && (
            <span className="station-distance">📍 {distanceText}</span>
          )}

          {navUrl && (
            <a
              href={navUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-navigation"
              title="Ouvrir l'itinéraire GPS"
            >
              🚗 Y aller
            </a>
          )}
        </div>
      </div>

      <div className="prices-grid">
        {available.length > 0 ? (
          available.map((fuel) => {
            const isSorted =
              activeSortFuel === fuel.id || activeSortFuel === fuel.key;

            return (
              <div
                key={fuel.key}
                className={`price-card ${fuel.id ? fuel.id.toLowerCase() : ''} ${
                  isSorted ? 'highlight-price' : ''
                }`}
              >
                <span className="fuel-name">{fuel.name}</span>
                <span className="fuel-price">{fuel.price} €</span>
                {fuel.maj && (
                  <span className="fuel-maj" title="Dernière mise à jour du prix">
                    🕒 {fuel.maj}
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <p className="status-message">Aucun prix disponible</p>
        )}
      </div>

      {tempOutOfStock.length > 0 && (
        <div className="rupture-section temp-rupture">
          <span className="rupture-title">⚠️ En rupture :</span>
          <div className="rupture-tags">
            {tempOutOfStock.map((item) => (
              <span key={item.id} className="rupture-tag temp-tag">
                {item.name}
                {item.dateText && (
                  <span className="rupture-date"> ({item.dateText})</span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}

      {defOutOfStock.length > 0 && (
        <div className="rupture-section def-rupture">
          <span className="rupture-title">🚫 Non proposé :</span>
          <div className="rupture-tags">
            {defOutOfStock.map((item) => (
              <span key={item.id} className="rupture-tag def-tag">
                {item.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}