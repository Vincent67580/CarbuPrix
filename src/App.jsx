import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FuelFilter, { FUELS } from './components/FuelFilter';
import MapView from './components/MapView';
import StationList from './components/StationList';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [center, setCenter] = useState([48.8566, 2.3522]); // Paris par défaut
  const [selectedFuel, setSelectedFuel] = useState('all');

  // Géolocalisation initiale
  const handleGetUserLocation = () => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée par votre navigateur.");
      setLoading(false);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCenter([latitude, longitude]);
        fetchStations(latitude, longitude);
      },
      () => {
        setError("Autorisez la géolocalisation ou recherchez une ville.");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    handleGetUserLocation();
  }, []);

  // Requête API avec geofilter.distance
  const fetchStations = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const latitude = Number(lat);
      const longitude = Number(lon);
      setCenter([latitude, longitude]);

      const url = `https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&geofilter.distance=${latitude}%2C${longitude}%2C10000&rows=30`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

      const data = await response.json();
      if (data.records && data.records.length > 0) {
    console.log("Données brutes d'une station :", data.records[0].fields);
  }

      const formattedResults = (data.records || []).map((record) => ({
        id: record.recordid,
        ...record.fields,
      }));

      setStations(formattedResults);
    } catch (err) {
      console.error("Détail de l'erreur :", err);
      setError(`Impossible de charger les stations (${err.message}).`);
    } finally {
      setLoading(false);
    }
  };

  // Trier les stations en fonction du carburant sélectionné
  const sortedStations = useMemo(() => {
    if (selectedFuel === 'all' || !Array.isArray(stations)) {
      return stations;
    }

    const fuelConfig = FUELS.find((f) => f.id === selectedFuel);
    const fuelKey = fuelConfig?.key || selectedFuel;

    return [...stations].sort((a, b) => {
      const priceA = parseFloat(a[fuelKey]);
      const priceB = parseFloat(b[fuelKey]);

      const hasA = !isNaN(priceA) && priceA > 0;
      const hasB = !isNaN(priceB) && priceB > 0;

      // Les stations sans ce carburant ou en rupture sont placées à la fin
      if (!hasA && !hasB) return 0;
      if (!hasA) return 1;
      if (!hasB) return -1;

      return priceA - priceB; // Du moins cher au plus cher
    });
  }, [stations, selectedFuel]);

  return (
    <div className="app-container">
      <Header />

      <SearchBar
        onSelectCity={(lat, lon) => fetchStations(lat, lon)}
        onUseGeolocation={handleGetUserLocation}
      />

      <FuelFilter
        selectedFuel={selectedFuel}
        onSelectFuel={(fuelId) => setSelectedFuel(fuelId)}
      />

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
          />
        </>
      )}
      <Footer />
    </div>
  );
}