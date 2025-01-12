//import { useState } from "react";

import "./App.css";
import CurrentDaySection from "./components/CurrentDaySection/CurrentDaySection";
import { WeeklyForecast } from "./components/WeeklyForecast/WeeklyForecast";
import { OtherCitiesWeather } from "./components/OtherCities/OtherCities";
import NavBar from "./components/NavBar/NavBar";
import { useEffect, useState } from "react";

import getCoordinates from "./services/geocoding";
import { WeatherData } from "./types/weather";
import { getWeatherForecast } from "./utils/utils";

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData>({
    cityName: "Loading...",
    temperature: 0,
    sunrise: "00:00",
    sunset: "00:00",
    forecast: [],
    icon: "",
    description: "",
    humidity: 0,
    pressure: "0",
    visibility: "0",
  });

  const DEFAULT_CITY = "London";

  useEffect(() => {
    const loadDefaultWeather = async () => {
      try {
        const coordinates = await getCoordinates(DEFAULT_CITY);
        if (coordinates) {
          const weather = await getWeatherForecast(coordinates);
          if (weather) {
            setWeatherData(weather);
          }
        }
      } catch (error) {
        console.error("Failed to load default weather:", error);
      }
    };

    loadDefaultWeather();
  }, []);

  const handleSearch = async (city: string) => {
    try {
      const coordinates = await getCoordinates(city);
      if (coordinates) {
        const weather = await getWeatherForecast(coordinates);
        if (weather) {
          setWeatherData(weather);
        }
      } else {
        alert("Location not found. Please try again.");
      }
    } catch {
      alert("Error fetching weather data. Please try again later");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <NavBar onSearch={handleSearch} cityName={weatherData.cityName} />
      <div className="flex-grow flex flex-col md:flex-row m-4 gap-4">
        <CurrentDaySection data={weatherData} />
        <div className="flex flex-col flex-1 gap-4">
          <div className="md:flex-[1.5]">
            <WeeklyForecast data={weatherData.forecast} />
          </div>
          <h2 className="text-3xl">Other Cities</h2>
          <div className="flex-1">
            <OtherCitiesWeather />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
