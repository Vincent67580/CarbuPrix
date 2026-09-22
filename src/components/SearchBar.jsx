import React, { useState, useEffect } from 'react';
import { searchCities } from '../api/addressApi';

export default function SearchBar({ onSelectCity, onUseGeolocation }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const cities = await searchCities(query);
        setSuggestions(cities);
        setIsOpen(cities.length > 0);
      } catch (err) {
        console.error("Erreur lors de la recherche de ville :", err);
        setSuggestions([]);
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
          onFocus={() => query.length >= 2 && suggestions.length > 0 && setIsOpen(true)}
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
              key={`${city.codePostal}-${index}`}
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