export const FUEL_MAP = {
  gazole: {
    name: 'Gazole',
    priceKey: 'gazole_prix',
    majKey: 'gazole_maj',
    ruptureTypeKey: 'gazole_rupture_type',
    ruptureDebutKey: 'gazole_rupture_debut',
  },
  e10: {
    name: 'SP95-E10',
    priceKey: 'e10_prix',
    majKey: 'e10_maj',
    ruptureTypeKey: 'e10_rupture_type',
    ruptureDebutKey: 'e10_rupture_debut',
  },
  sp98: {
    name: 'SP98',
    priceKey: 'sp98_prix',
    majKey: 'sp98_maj',
    ruptureTypeKey: 'sp98_rupture_type',
    ruptureDebutKey: 'sp98_rupture_debut',
  },
  sp95: {
    name: 'SP95',
    priceKey: 'sp95_prix',
    majKey: 'sp95_maj',
    ruptureTypeKey: 'sp95_rupture_type',
    ruptureDebutKey: 'sp95_rupture_debut',
  },
  e85: {
    name: 'E85',
    priceKey: 'e85_prix',
    majKey: 'e85_maj',
    ruptureTypeKey: 'e85_rupture_type',
    ruptureDebutKey: 'e85_rupture_debut',
  },
  gplc: {
    name: 'GPLc',
    priceKey: 'gplc_prix',
    majKey: 'gplc_maj',
    ruptureTypeKey: 'gplc_rupture_type',
    ruptureDebutKey: 'gplc_rupture_debut',
  },
};

// Génération dynamique de la liste des filtres
export const FUELS = [
  { id: 'all', label: 'Tous' },
  ...Object.entries(FUEL_MAP).map(([id, config]) => ({
    id,
    label: config.name,
    key: config.priceKey,
  })),
];