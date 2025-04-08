const API_ENDPOINT =
  "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

export const fetchCountryFlag = async () => {
  try {
    const res = await fetch(`${API_ENDPOINT}`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Expected an array of countries");
    }
    return data || [];
  } catch (error) {
    console.error("Error fetching data:", error);
    // throw err;
  }
};
