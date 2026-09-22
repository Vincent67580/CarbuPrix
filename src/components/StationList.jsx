import React from 'react';
import StationCard from './StationCard';

export default function StationList({ stations, activeSortFuel, center }) {
  if (!Array.isArray(stations) || stations.length === 0) {
    return <p className="status-message">Aucune station disponible.</p>;
  }

  return (
    <main className="stations-list">
      {stations.map((station, index) => (
        <StationCard
          key={station.id || index}
          station={station}
          activeSortFuel={activeSortFuel}
          center={center}
        />
      ))}
    </main>
  );
}