/**
 * Récupère TOUTES les stations-service autour d'un point géographique.
 * Inclut la pagination automatique et la mise en cache (sessionStorage, TTL 15 min).
 *
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {number} radiusInMeters - Rayon de recherche en mètres
 * @returns {Promise<Array>} Liste des stations formatées
 */
export async function fetchStationsFromApi(lat, lon, radiusInMeters) {
  const latitude = Number(lat);
  const longitude = Number(lon);

  // Clé unique de cache basée sur la position (arrondie à ~1 km près) et le rayon
  const cacheKey = `carbuprix_${latitude.toFixed(2)}_${longitude.toFixed(2)}_${radiusInMeters}`;
  const TTL = 15 * 60 * 1000; // Durée de vie du cache : 15 minutes

  // 1. Vérification de la présence des données dans le cache
  try {
    const cachedItem = sessionStorage.getItem(cacheKey);
    if (cachedItem) {
      const { timestamp, data } = JSON.parse(cachedItem);
      if (Date.now() - timestamp < TTL) {
        console.log(`[CarbuPrix] Cache : ${data.length} station(s) chargée(s) instantanément.`);
        return data;
      }
    }
  } catch (e) {
    console.warn('[CarbuPrix] Erreur de lecture du cache :', e);
  }

  // 2. Récupération via l'API avec boucle de pagination si nécessaire
  const rows = 100;
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

    if (allRecords.length >= (data.nhits || 0) || records.length < rows) {
      hasMore = false;
    } else {
      start += rows;
    }
  }

  console.log(`[CarbuPrix] API : ${allRecords.length} station(s) récupérée(s) au total dans un rayon de ${radiusInMeters / 1000} km.`);

  // Formatage des données
  const formattedStations = allRecords.map((record) => ({
    id: record.recordid,
    ...record.fields,
  }));

  // 3. Sauvegarde des résultats formatés dans le cache
  try {
    sessionStorage.setItem(
      cacheKey,
      JSON.stringify({
        timestamp: Date.now(),
        data: formattedStations,
      })
    );
  } catch (e) {
    console.warn('[CarbuPrix] Impossible d\'écrire dans le cache :', e);
  }

  return formattedStations;
}