import { FUELS } from '../constants/fuelMap';

/**
 * Trie les stations par prix ou par distance pour un carburant donné.
 * @param {Array} stations - Liste des stations
 * @param {string} selectedFuel - Identifiant du carburant ('all', 'gazole', etc.)
 * @param {string} sortBy - Critère de tri ('price' ou 'distance')
 * @returns {Array} Liste triée
 */
export function sortStations(stations, selectedFuel = 'all', sortBy = 'price') {
  if (!Array.isArray(stations) || stations.length === 0) {
    return [];
  }

  const fuelConfig = FUELS.find((f) => f.id === selectedFuel);
  const fuelKey = fuelConfig?.key || selectedFuel;

  return [...stations].sort((a, b) => {
    // Récupération des prix pour le carburant sélectionné
    const priceA = parseFloat(a[fuelKey]);
    const priceB = parseFloat(b[fuelKey]);
    const hasPriceA = !isNaN(priceA) && priceA > 0;
    const hasPriceB = !isNaN(priceB) && priceB > 0;

    // --- MODE 1 : Tri par Distance ---
    if (sortBy === 'distance') {
      // Si un carburant spécifique est choisi, on place en fin de liste les stations qui ne l'ont pas
      if (selectedFuel !== 'all') {
        if (!hasPriceA && !hasPriceB) return 0;
        if (!hasPriceA) return 1;
        if (!hasPriceB) return -1;
      }

      const distA = parseFloat(a.distance ?? Infinity);
      const distB = parseFloat(b.distance ?? Infinity);
      return distA - distB;
    }

    // --- MODE 2 : Tri par Prix (par défaut) ---
    if (selectedFuel === 'all') {
      // Si aucun carburant n'est ciblé, fallback sur la distance
      const distA = parseFloat(a.distance ?? Infinity);
      const distB = parseFloat(b.distance ?? Infinity);
      return distA - distB;
    }

    if (!hasPriceA && !hasPriceB) return 0;
    if (!hasPriceA) return 1;
    if (!hasPriceB) return -1;

    return priceA - priceB;
  });
}