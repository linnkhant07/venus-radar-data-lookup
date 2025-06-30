export function getCycle2Status(lat, lon) {


  const isLikely = (
    (lat >= -85 && lat <= -35 && lon >= -180 && lon <= -150) ||     // Region 1
    (lat >= -87 && lat <= 0 && lon >= -140 && lon <= 95) ||       // Region 2 
    (lat >= -85 && lat <= -40 && lon >= 155 && lon <= 180) ||     // Region 3
    (lat >= 0 && lat <= 15 && lon >= -45 && lon <= 30) ||         // Region 4
    (lat >= 0 && lat <= 75 && lon >= -120 && lon <= -55) ||        // Region 5
    (lat >= 60 && lat <= 75 && lon >= -150 && lon <= -120)          // Region 6
  );

  return {
    coverage: isLikely ? "Likely Covered" : "Likely Not Covered",
    viewDirection: isLikely ? "right" : null
  };
}
