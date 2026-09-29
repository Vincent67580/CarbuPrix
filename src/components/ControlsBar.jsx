import React, { useState } from 'react';
import FuelFilter from './FuelFilter';
import SortFilter from './SortFilter';
import RadiusSelector from './RadiusSelector';

export default function ControlsBar({
  selectedFuel,
  onSelectFuel,
  sortBy,
  onSelectSort,
  radius,
  onChangeRadius,
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`controls-wrapper ${isOpen ? 'open' : 'closed'}`}>
      {/* Bouton d'entête pour afficher/masquer */}
      <button
        type="button"
        className="controls-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span className="toggle-label">⚙️ Filtres & Tri</span>
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