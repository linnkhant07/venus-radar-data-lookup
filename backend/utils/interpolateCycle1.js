import { cycle1RadarTable } from './cycle1RadarTable.js';

export function interpolateCycle1(lat) {
  if (lat > 90 || lat < -90) throw new Error("Latitude out of range");

  // If exact match
  const exact = cycle1RadarTable.find((d) => d.latitude === lat);
  if (exact) {
    return {
      latitude: lat,
      incidenceAngle: exact.incidence,
      numberOfLooks: exact.looks,
      crossTrackResolution: exact.crossTrack,
      alongTrackResolution: 110,
    };
  }

  // Find bounding points
  let lower = null;
  let upper = null;

  for (let i = 0; i < cycle1RadarTable.length - 1; i++) {
    const a = cycle1RadarTable[i];
    const b = cycle1RadarTable[i + 1];

    // If lat falls between a and b
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
    // Outside bounds — clamp to nearest
    const closest = lat > cycle1RadarTable[0].latitude
      ? cycle1RadarTable[0]
      : cycle1RadarTable[cycle1RadarTable.length - 1];

    return {
      latitude: lat,
      incidenceAngle: closest.incidence,
      numberOfLooks: closest.looks,
      crossTrackResolution: closest.crossTrack,
      alongTrackResolution: 110,
    };
  }

  const ratio = (lat - lower.latitude) / (upper.latitude - lower.latitude);

  const lerp = (a, b) => a + (b - a) * ratio;

  return {
    latitude: lat,
    incidenceAngle: lerp(lower.incidence, upper.incidence),
    numberOfLooks: Math.round(lerp(lower.looks, upper.looks)),
    crossTrackResolution: Math.round(lerp(lower.crossTrack, upper.crossTrack)),
    alongTrackResolution: 110,
  };
}
