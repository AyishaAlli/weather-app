//import { useState } from "react";

import "./App.css";
import CurrentDaySection from "./components/CurrentDaySection/CurrentDaySection";
import { WeeklyForecast } from "./components/WeeklyForecast/WeeklyForecast";
import { OtherCitiesWeather } from "./components/OtherCitiesWeather/OtherCitiesWeather";
import NavBar from "./components/NavBar/NavBar";
import { useEffect, useState } from "react";

import fetchWeatherData from "./services/meteomatics";
import getCoordinates from "./services/geocoding";
import { WeatherData } from "./types/weather";
import { decimalToTime } from "./utils/timeUtils";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState("");

  const DEFAULT_CITY = "London";

  useEffect(() => {
    const loadDefaultWeather = async () => {
      try {
        const coordinates = await getCoordinates(DEFAULT_CITY);
        if (coordinates) {
          const now = new Date().toISOString().split(".")[0] + "Z";
          const url = `${now}/t_2m:C,sunrise:dn,sunset:dn,weather_symbol_1h:idx/${coordinates.lat},${coordinates.lng}/json?model=mix`;

          const response = await fetchWeatherData(url);
          const sunrise = decimalToTime(
            response.data[1].coordinates[0].dates[0].value
          );
          const sunset = decimalToTime(
            response.data[2].coordinates[0].dates[0].value
          );

          setWeatherData({
            cityName: coordinates.city_name,
            temperature: Math.ceil(
              response.data[0].coordinates[0].dates[0].value
            ),
            sunrise: sunrise,
            sunset: sunset,
            icon: "",
          });
        }
      } catch (error) {
        console.error("Failed to load default weather:", error);
      }
    };

    loadDefaultWeather();
  }, []);

  const handleSearch = async (city: string) => {
    setError("");
    try {
      const coordinates = await getCoordinates(city);
      if (coordinates) {
        const now = new Date().toISOString().split(".")[0] + "Z";
        const url = `${now}/t_2m:C,sunrise:dn,sunset:dn,weather_symbol_1h:idx/${coordinates.lat},${coordinates.lng}/json?model=mix`;

        const response = await fetchWeatherData(url);

        const sunrise = decimalToTime(
          response.data[1].coordinates[0].dates[0].value
        );
        const sunset = decimalToTime(
          response.data[2].coordinates[0].dates[0].value
        );

        setWeatherData({
          cityName: coordinates.city_name,
          temperature: Math.ceil(
            response.data[0].coordinates[0].dates[0].value
          ),
          sunrise: sunrise,
          sunset: sunset,
          icon: "",
        });
      } else {
        setError("Location not found. Please try again.");
      }
    } catch {
      setError("Error fetching weather data.");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <NavBar
        onSearch={handleSearch}
        cityName={weatherData ? weatherData.cityName : "London"}
      />
      <div className="flex-grow flex flex-col md:flex-row m-4 gap-4">
        <CurrentDaySection data={weatherData} />
        <div className="flex flex-col flex-1 gap-4">
          <div className="md:flex-[1.5]">
            <WeeklyForecast />
          </div>
          <div className="flex-1">
            <OtherCitiesWeather />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
