export function getCycle2Status(lat, lon) {
    // Normalize W longitudes to 0–360 E
    if (lon < 0) lon = 360 + lon;
  
    // Right-looking swath: southern band only
    if (lat >= -70 && lat <= -30 && lon >= 30 && lon <= 300) {
      return {
        coverage: "likely",
        viewDirection: "right"
      };
    }
  
    if (lat >= -30 && lat <= 0 && lon >= 30 && lon <= 90) {
      return {
        coverage: "possible",
        viewDirection: "right"
      };
    }
  
    return {
      coverage: "unlikely",
      viewDirection: null
    };
  }
  