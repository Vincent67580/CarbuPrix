/**
 * Récupère TOUTES les stations-service autour d'un point géographique (pagination automatique).
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {number} radiusInMeters - Rayon de recherche en mètres
 * @returns {Promise<Array>} Liste des stations formatées
 */
export async function fetchStationsFromApi(lat, lon, radiusInMeters) {
  const latitude = Number(lat);
  const longitude = Number(lon);
  const rows = 100; // Limite maximale par requête sur l'API v1
  let start = 0;
  let allRecords = [];
  let hasMore = true;

  while (hasMore) {
    const url = `https://data.economie.gouv.fr/api/records/1.0/search/?dataset=prix-des-carburants-en-france-flux-instantane-v2&geofilter.distance=${latitude}%2C${longitude}%2C${radiusInMeters}&rows=${rows}&start=${start}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    const records = data.records || [];

    allRecords = [...allRecords, ...records];

    // On s'arrête si on a atteint le total (nhits) ou s'il n'y a plus de résultats
    if (allRecords.length >= (data.nhits || 0) || records.length < rows) {
      hasMore = false;
    } else {
      start += rows; // On avance de 100 résultats pour la requête suivante
    }
  }

  
  return allRecords.map((record) => ({
    id: record.recordid,
    ...record.fields,
  }));
}