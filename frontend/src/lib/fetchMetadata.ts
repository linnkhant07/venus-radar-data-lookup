export async function fetchMetadata(lat: number, lon: number) {
    const res = await fetch(`https://venus-radar-data-lookup.onrender.com/api/metadata?lat=${lat}&lon=${lon}`);
  
    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody?.error || "Server error");
    }
  
    return await res.json();
  }
  