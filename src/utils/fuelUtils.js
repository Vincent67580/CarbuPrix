import { FUELS } from '../components/FuelFilter';

/**
 * Trie les stations par prix croissant pour un carburant donné.
 * @param {Array} stations - Liste des stations
 * @param {string} selectedFuel - Identifiant du carburant ('all', 'gazole', etc.)
 * @returns {Array} Liste triée
 */
export function sortStationsByFuelPrice(stations, selectedFuel) {
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

    if (!hasA && !hasB) return 0;
    if (!hasA) return 1;
    if (!hasB) return -1;

    return priceA - priceB;
  });
}