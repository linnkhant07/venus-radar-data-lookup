import express from 'express';
import cors from 'cors';
import { interpolateCycle1 } from './utils/interpolateCycle1.js';
import { getCycle2Status } from './utils/getCycle2Status.js';

const app = express();
app.use(cors());
app.use(express.json());

const isCycle1Covered = (lat) => lat >= -74 && lat <= 89;

app.get('/api/metadata', (req, res) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);

  if (isNaN(lat) || lat < -90 || lat > 90 || isNaN(lon) || lon < -180 || lon > 360) {
    return res.status(400).json({ error: "Invalid lat/lon" });
  }

  const cycle1 = interpolateCycle1(lat);
  const cycle2 = getCycle2Status(lat, lon);

  res.json({
    latitude: lat,
    longitude: lon,
    cycle1: {
      covered: isCycle1Covered(lat),
      viewDirection: "left",
      ...cycle1
    },
    cycle2
  });
});

app.listen(8000, () => console.log('🚀 Backend running at http://localhost:8000'));
