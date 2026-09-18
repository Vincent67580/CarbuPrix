import React, { useState, useEffect } from 'react';

export default function SearchBar({ onSelectCity, onUseGeolocation }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&type=municipality&limit=5`
        );
        const data = await response.json();
        
        const cities = data.features.map((item) => ({
          nom: item.properties.label,
          codePostal: item.properties.postcode,
          coordinates: item.geometry.coordinates, // [longitude, latitude]
        }));

        setSuggestions(cities);
        setIsOpen(true);
      } catch (err) {
        console.error("Erreur lors de la recherche de ville :", err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (city) => {
    setQuery(`${city.nom} (${city.codePostal})`);
    setIsOpen(false);
    onSelectCity(city.coordinates[1], city.coordinates[0]);
  };

  const handleGeolocationClick = () => {
    setQuery('');
    setIsOpen(false);
    onUseGeolocation();
  };

  return (
    <div className="search-bar-container">
      <div className="search-input-group">
        <input
          type="text"
          className="search-input"
          placeholder="Rechercher une ville..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
        />
        <button 
          type="button" 
          className="geo-btn"
          onClick={handleGeolocationClick}
          title="Autour de moi"
        >
          📍 Autour de moi
        </button>
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((city, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => handleSelect(city)}
            >
              <strong>{city.nom}</strong> <span>({city.codePostal})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}