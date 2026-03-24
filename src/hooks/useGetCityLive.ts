const getCityFromCoords = async (lat: number, lng: number): Promise<string | null> => {
    const apiKey = "YOUR_OPENCAGE_API_KEY";
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
    );
    const data = await response.json();
  
    const components = data.results[0]?.components;
    return components?.city || components?.town || components?.village || null;
  };  