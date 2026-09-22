import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FuelFilter from './components/FuelFilter';
import RadiusSelector from './components/RadiusSelector';
import MapView from './components/MapView';
import StationList from './components/StationList';
import Footer from './components/Footer';

import { fetchStationsFromApi } from './api/fuelApi';
import { sortStationsByFuelPrice } from './utils/fuelUtils';
import './App.css';

export default function App() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState([48.8566, 2.3522]); // Paris par défaut
  const [selectedFuel, setSelectedFuel] = useState('all');
  const [searchRadius, setSearchRadius] = useState(10000); // 10 km par défaut

  // Chargement des stations via le service API dédié
  const fetchStations = useCallback(async (lat, lon, radius = searchRadius) => {
    setLoading(true);
    setError(null);
    try {
      setCenter([Number(lat), Number(lon)]);
      const data = await fetchStationsFromApi(lat, lon, radius);
      setStations(data);
    } catch (err) {
      console.error("Détail de l'erreur :", err);
      setError(`Impossible de charger les stations (${err.message}).`);
    } finally {
      setLoading(false);
    }
  }, [searchRadius]);

  // Géolocalisation
  const handleGetUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
      setLoading(false);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchStations(latitude, longitude, searchRadius);
      },
      () => {
        setError("Autorisez la géolocalisation ou recherchez une ville.");
        setLoading(false);
      }
    );
  }, [fetchStations, searchRadius]);

  useEffect(() => {
    handleGetUserLocation();
  }, []);

  // Modification du rayon
  const handleRadiusChange = (newRadius) => {
    setSearchRadius(newRadius);
    if (center?.length === 2) {
      fetchStations(center[0], center[1], newRadius);
    }
  };

  // Stations triées calculées via l'utilitaire
  const sortedStations = useMemo(
    () => sortStationsByFuelPrice(stations, selectedFuel),
    [stations, selectedFuel]
  );

  return (
    <div className="app-container">
      <Header />

      <SearchBar
        onSelectCity={(lat, lon) => fetchStations(lat, lon, searchRadius)}
        onUseGeolocation={handleGetUserLocation}
      />

      <div className="controls-bar">
        <FuelFilter
          selectedFuel={selectedFuel}
          onSelectFuel={setSelectedFuel}
        />
        <RadiusSelector
          radius={searchRadius}
          onChangeRadius={handleRadiusChange}
        />
      </div>

      {loading && <div className="status-message">Recherche des stations à proximité...</div>}
      {error && <div className="error-message">{error}</div>}

      {!loading && !error && (
        <>
          <MapView
            center={center}
            stations={sortedStations}
            selectedFuel={selectedFuel}
          />
          <StationList 
            stations={sortedStations} 
            activeSortFuel={selectedFuel}
            center={center}
          />
        </>
      )}

      <Footer />
    </div>
  );
}