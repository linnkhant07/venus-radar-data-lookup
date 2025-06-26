'use client'
import { useState } from "react";

export default function Home() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [data, setData] = useState(null);

  const fetchMetadata = async () => {
    const res = await fetch(`http://localhost:8000/api/metadata?lat=${lat}&lon=${lon}`);
    const json = await res.json();
    setData(json);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Venus Radar Metadata Explorer</h1>

      <input
        type="number"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        style={{ marginRight: "1rem" }}
      />
      <input
        type="number"
        placeholder="Longitude"
        value={lon}
        onChange={(e) => setLon(e.target.value)}
      />
      <button onClick={fetchMetadata} style={{ marginLeft: "1rem" }}>
        Lookup
      </button>

      {data && (
        <div className="mt-8 bg-gray-100 p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-2">Radar Metadata</h2>

          <p><strong>Latitude:</strong> {data.latitude}</p>
          <p><strong>Longitude:</strong> {data.longitude}</p>

          <h3 className="mt-4 font-semibold text-lg">Cycle 1</h3>
          <p><strong>Covered:</strong> {data.cycle1.covered ? "Yes" : "No"}</p>
          <p><strong>Incidence Angle:</strong> {data.cycle1.incidenceAngle.toFixed(2)}°</p>
          <p><strong>Number of Looks:</strong> {data.cycle1.numberOfLooks}</p>
          <p><strong>Cross-track Resolution:</strong> {data.cycle1.crossTrackResolution} m</p>
          <p><strong>Along-track Resolution:</strong> {data.cycle1.alongTrackResolution} m</p>

          <h3 className="mt-4 font-semibold text-lg">Cycle 2 (Right-looking)</h3>
          <p><strong>Coverage:</strong> {data.cycle2.coverage}</p>
          <p><strong>View Direction:</strong> {data.cycle2.viewDirection || "N/A"}</p>
        </div>
      )}
    </div>
  );
}
