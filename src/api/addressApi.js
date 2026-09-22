/**
 * Recherche des communes françaises via l'API Adresse (BAN).
 * @param {string} query - Le texte saisi par l'utilisateur
 * @param {number} limit - Nombre maximum de résultats (défaut: 5)
 * @returns {Promise<Array>} Liste de villes formatées
 */
export async function searchCities(query, limit = 5) {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(
    query
  )}&type=municipality&limit=${limit}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Erreur HTTP adresse API: ${response.status}`);
  }

  const data = await response.json();

  return (data.features || []).map((item) => ({
    nom: item.properties.label,
    codePostal: item.properties.postcode,
    coordinates: item.geometry.coordinates, // [longitude, latitude]
  }));
}