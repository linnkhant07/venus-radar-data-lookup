import { cycle2RadarTable } from './cycle2RadarTable.js';

export function interpolateCycle2(lat) {
  if (lat > 90 || lat < -90) throw new Error("Latitude out of range");

  const exact = cycle2RadarTable.find((d) => d.latitude === lat);
  if (exact) {
    return {
      latitude: lat,
      incidenceAngle: exact.incidence
    };
  }

  let lower = null;
  let upper = null;

  for (let i = 0; i < cycle2RadarTable.length - 1; i++) {
    const a = cycle2RadarTable[i];
    const b = cycle2RadarTable[i + 1];

    if (
      (lat < a.latitude && lat > b.latitude) ||
      (lat > a.latitude && lat < b.latitude)
    ) {
      lower = a;
      upper = b;
      break;
    }
  }

  if (!lower || !upper) {
    const closest = lat > cycle2RadarTable[0].latitude
      ? cycle2RadarTable[0]
      : cycle2RadarTable[cycle2RadarTable.length - 1];

    return {
      latitude: lat,
      incidenceAngle: closest.incidence
    };
  }

  const ratio = (lat - lower.latitude) / (upper.latitude - lower.latitude);
  const lerp = (a, b) => a + (b - a) * ratio;

  return {
    latitude: lat,
    incidenceAngle: lerp(lower.incidence, upper.incidence)
  };
}
