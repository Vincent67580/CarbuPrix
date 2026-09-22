/**
 * Récupère les stations-service autour d'un point géographique.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {number} radiusInMeters - Rayon de recherche en mètres
 * @returns {Promise<Array>} Liste des stations formatées
 */
export async function fetchStationsFromApi(lat, lon, radiusInMeters) {
  const latitude = Number(lat);
  const longitude = Number(lon);

  const url = `https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&geofilter.distance=${latitude}%2C${longitude}%2C${radiusInMeters}&rows=50`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  const data = await response.json();

  return (data.records || []).map((record) => ({
    id: record.recordid,
    ...record.fields,
  }));
}