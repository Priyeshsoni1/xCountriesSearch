import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { fetchCountryFlag } from "../server/Fetchers";

const Countries = () => {
  const [Country, setCountry] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const fetchData = async () => {
    try {
      const data = await fetchCountryFlag();

      setCountry(data); // Ensure data is always an array
      setFilteredCountries(data); // Initialize filteredCountries with the full data set
    } catch (error) {
      console.error("Error fetching data:", error);
      setCountry([]); // Fallback to an empty array on error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (inputValue === "") {
      setFilteredCountries(Country); // Reset to full list if input is empty
    } else {
      const filteredCountries = Country.filter((country) =>
        country.common.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCountries(filteredCountries);
    }
  }, [inputValue]);
  return (
    <div>
      <input
        style={{
          width: "50rem",
          height: "2rem",
          borderRadius: "4px",
          fontSize: "1.2rem",
        }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Search for countries..."
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginTop: "2rem",
        }}
      >
        {Array.isArray(filteredCountries) &&
          filteredCountries.map((Countries, index) => {
            return <Card Countries={Countries} key={index} />;
          })}
      </div>
    </div>
  );
};

export default Countries;
