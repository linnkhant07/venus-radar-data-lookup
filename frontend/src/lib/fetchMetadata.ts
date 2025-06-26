export async function fetchMetadata(lat: number, lon: number) {
    const res = await fetch(`http://localhost:8000/api/metadata?lat=${lat}&lon=${lon}`);
  
    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody?.error || "Server error");
    }
  
    return await res.json();
  }
  