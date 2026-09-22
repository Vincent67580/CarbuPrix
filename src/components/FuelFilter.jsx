import React from 'react';
import { FUELS } from '../constants/fuelMap';

export default function FuelFilter({ selectedFuel, onSelectFuel }) {
  return (
    <div className="fuel-filter-container">
      <span className="filter-title">Type de carburant :</span>
      <div className="fuel-buttons">
        {FUELS.map((fuel) => (
          <button
            key={fuel.id}
            className={`fuel-btn ${fuel.id !== 'all' ? fuel.id : ''} ${
              selectedFuel === fuel.id ? 'active' : ''
            }`}
            onClick={() => onSelectFuel(fuel.id)}
          >
            {fuel.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export { FUELS };