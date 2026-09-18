import { FUEL_MAP } from '../constants/fuelMap';
import { formatPriceDate, formatRuptureDate } from './formatters';

export function getFuelData(station) {
  if (!station) return { available: [], tempOutOfStock: [], defOutOfStock: [] };

  const available = [];
  const tempOutOfStock = [];
  const defOutOfStock = [];

  Object.keys(FUEL_MAP).forEach((fuelId) => {
    const fuelInfo = FUEL_MAP[fuelId];
    const rawPrice = station[fuelInfo.priceKey];

    if (rawPrice !== undefined && rawPrice !== null && !isNaN(Number(rawPrice))) {
      const majDateFormatted = formatPriceDate(station[fuelInfo.majKey]);

      available.push({
        id: fuelId,
        key: fuelInfo.priceKey,
        name: fuelInfo.name,
        price: Number(rawPrice).toFixed(3),
        maj: majDateFormatted,
      });
    } else {
      const ruptureType = station[fuelInfo.ruptureTypeKey];
      const ruptureDebut = station[fuelInfo.ruptureDebutKey];

      if (ruptureType === 'temporaire') {
        tempOutOfStock.push({
          id: fuelId,
          name: fuelInfo.name,
          dateText: formatRuptureDate(ruptureDebut),
        });
      } else if (ruptureType === 'definitive') {
        defOutOfStock.push({
          id: fuelId,
          name: fuelInfo.name,
        });
      }
    }
  });

  return { available, tempOutOfStock, defOutOfStock };
}