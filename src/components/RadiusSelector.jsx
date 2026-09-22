import React from 'react';

const RADIUS_OPTIONS = [
  { label: '5 km', value: 5000 },
  { label: '10 km', value: 10000 },
  { label: '20 km', value: 20000 },
  { label: '30 km', value: 30000 },
  { label: '50 km', value: 50000 },
];

export default function RadiusSelector({ radius, onChangeRadius }) {
  return (
    <div className="radius-selector">
      <label htmlFor="radius-select">
        <strong>Rayon : </strong>
      </label>
      <select
        id="radius-select"
        value={radius}
        onChange={(e) => onChangeRadius(Number(e.target.value))}
      >
        {RADIUS_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}