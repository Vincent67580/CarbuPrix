import React, { useState } from 'react';
import FuelFilter from './FuelFilter';
import SortFilter from './SortFilter';
import RadiusSelector from './RadiusSelector';
import { FUELS } from '../constants/fuelMap';

export default function ControlsBar({
  selectedFuel,
  onSelectFuel,
  sortBy,
  onSelectSort,
  radius,
  onChangeRadius,
}) {
  const [isOpen, setIsOpen] = useState(true);

  // Construction du libellé de résumé
  const currentFuelLabel = FUELS.find((f) => f.id === selectedFuel)?.label || 'Tous';
  const sortLabel = sortBy === 'price' ? 'Prix le plus bas' : 'Proximité';
  const radiusKm = radius / 1000;
  const summaryText = `${currentFuelLabel} • ${sortLabel} • ${radiusKm} km`;

  return (
    <div className={`controls-wrapper ${isOpen ? 'open' : 'closed'}`}>
      <button
        type="button"
        className="controls-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <div className="toggle-label">
          <span>⚙️ Filtres & Tri</span>
          {!isOpen && <span className="summary-chip">{summaryText}</span>}
        </div>
        <span className="toggle-icon">{isOpen ? '▲ Masquer' : '▼ Afficher'}</span>
      </button>

      {/* Zone contenant les 3 filtres */}
      <div className="controls-content">
        <FuelFilter
          selectedFuel={selectedFuel}
          onSelectFuel={onSelectFuel}
        />
        <SortFilter
          sortBy={sortBy}
          onSelectSort={onSelectSort}
        />
        <RadiusSelector
          radius={radius}
          onChangeRadius={onChangeRadius}
        />
      </div>
    </div>
  );
}