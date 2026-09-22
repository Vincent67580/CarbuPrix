/**
 * Génère un lien d'itinéraire ultra-précis basé sur le GPS exact
 */
export function getNavigationUrl(lat, lon) {
  if (!lat || !lon) return null;

  // Option A : Mode Navigation direct Google Maps (Force le GPS exact sur mobile)
  // dir_action=navigate dit à Google de guider vers ces coordonnées précises sans chercher d'adresse
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}&dir_action=navigate`;
}

/**
 * Lien optionnel si l'utilisateur préfère Waze
 */
export function getWazeUrl(lat, lon) {
  if (!lat || !lon) return null;
  return `https://waze.com/ul?ll=${lat},${lon}&navigate=yes`;
}