import stationBrands from '../data/stations_brands.json';

const BRAND_ALIASES = [
  { keywords: ['ELAN', 'TOTAL ACCESS', 'TOTAL RELAIS', 'TOTAL'], name: 'TotalEnergies' },
  { keywords: ['LECLERC', 'SODI'], name: 'E.Leclerc' },
  { keywords: ['INTERMARCHE', 'ITM'], name: 'Intermarché' },
  { keywords: ['SUPER U', 'HYPER U', 'U EXPRESS', 'STATION U', 'SYSTEME U'], name: 'Système U' },
  { keywords: ['CARREFOUR', 'CARREFOUR MARKET', 'CARREFOUR CONTACT'], name: 'Carrefour' },
  { keywords: ['AUCHAN', 'SIMPLY'], name: 'Auchan' },
  { keywords: ['CASINO', 'GEANT'], name: 'Casino' },
  { keywords: ['ESSO EXPRESS', 'ESSO'], name: 'Esso' },
  { keywords: ['BP '], name: 'BP' },
  { keywords: ['AVIA'], name: 'Avia' },
  { keywords: ['CORA'], name: 'Cora' },
  { keywords: ['NETTO'], name: 'Netto' },
];

function cleanBrandName(rawName) {
  if (!rawName) return null;

  // Extraction de la valeur textuelle si rawName est un objet ou un nombre
  let nameString = '';
  if (typeof rawName === 'string') {
    nameString = rawName;
  } else if (typeof rawName === 'object' && rawName !== null) {
    nameString = rawName.name || rawName.marque || rawName.brand || String(rawName);
  } else {
    nameString = String(rawName);
  }

  const upper = nameString.toUpperCase();

  for (const brand of BRAND_ALIASES) {
    if (brand.keywords.some((kw) => upper.includes(kw))) {
      return brand.name;
    }
  }

  return nameString;
}

export function getStationName(station) {
  if (!station) return 'Station essence';

  // Sécurisation de l'ID (conversion en string au cas où station.id soit un Number)
  const stationId = String(station.id || '');
  const rawBrand = stationBrands[stationId];

  if (rawBrand) {
    const brandName = cleanBrandName(rawBrand);
    return station.ville ? `${brandName} - ${station.ville}` : brandName;
  }

  // Fallback par mots-clés dans l'adresse si l'ID est introuvable
  const searchString = `${station.adresse || ''} ${station.ville || ''}`.toUpperCase();
  for (const brand of BRAND_ALIASES) {
    if (brand.keywords.some((kw) => searchString.includes(kw))) {
      return station.ville ? `${brand.name} - ${station.ville}` : brand.name;
    }
  }

  // Fallback par défaut
  return station.ville ? `Station ${station.ville}` : 'Station essence';
}