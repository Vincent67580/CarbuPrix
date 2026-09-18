export function formatPriceDate(dateString) {
  if (!dateString) return null;

  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) return null;

  const [, yearStr, monthStr, dayStr, hours, minutes] = match;

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  const now = new Date();
  const isToday =
    day === now.getDate() &&
    month === now.getMonth() &&
    year === now.getFullYear();

  if (isToday) {
    return `${hours}:${minutes}`;
  }

  return `${dayStr}/${monthStr} ${hours}:${minutes}`;
}

export function formatRuptureDate(dateString) {
  if (!dateString) return null;

  // Extraction brute de l'année, mois, jour, heures et minutes
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/);
  if (!match) return null;

  const [, yearStr, monthStr, dayStr, hours, minutes] = match;

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10) - 1;
  const day = parseInt(dayStr, 10);

  const now = new Date();
  const targetDay = new Date(year, month, day);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffTime = today - targetDay;
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return `depuis aujourd'hui ${hours}:${minutes}`;
  } else if (diffDays === 1) {
    return `depuis hier ${hours}:${minutes}`;
  } else {
    return `depuis le ${dayStr}/${monthStr} à ${hours}:${minutes}`;
  }
}