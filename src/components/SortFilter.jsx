import React from 'react';

export default function SortFilter({ sortBy, onSelectSort }) {
  return (
    <div className="sort-filter-container">
      <span className="filter-title">Trier par :</span>
      <div className="sort-buttons">
        <button
          type="button"
          className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
          onClick={() => onSelectSort('price')}
        >
          🏷️ Prix le plus bas
        </button>
        <button
          type="button"
          className={`sort-btn ${sortBy === 'distance' ? 'active' : ''}`}
          onClick={() => onSelectSort('distance')}
        >
          📍 Proximité
        </button>
      </div>
    </div>
  );
}