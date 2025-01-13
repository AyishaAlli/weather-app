import axios from "axios";
import { Forecast, GeolocationData } from "../types/weather";
import { convertTimestampToTime } from "../utils/utils";
import { mockWeatherData } from "../mocks/mockData";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const CURRENT_WEATHER_URL = `${BASE_URL}/weather`;
const FORECAST_URL = `${BASE_URL}/forecast`;

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const isDevMode = import.meta.env.VITE_APP_USE_MOCK_DATA === "true"; // Check if in development mode

export const fetchWeatherDataByCoords = async (geoData: GeolocationData) => {
  if (!geoData?.latitude || !geoData?.longitude) {
    console.warn("Invalid geolocation data provided.");
    return {};
  }
  try {
    if (isDevMode) {
      console.log("Using mock weather data");
      return mockWeatherData;
    }

    const currentWeatherURL = `${CURRENT_WEATHER_URL}/?lat=${geoData.latitude}&lon=${geoData.longitude}&appid=${API_KEY}&units=metric`;
    const forecastWeatherURL = `${FORECAST_URL}/?lat=${geoData.latitude}&lon=${geoData.longitude}&appid=${API_KEY}&units=metric`;

    const [current, forecast] = await Promise.all([
      axios.get(currentWeatherURL),
      axios.get(forecastWeatherURL),
    ]);

    const { data: currentData } = current;
    const { data: forecastData } = forecast;

    const fiveDayForecast: Forecast[] = forecastData.list
      .slice(0, 5)
      .map((data, index: number) => {
        return {
          date: data.dt,
          temperature: Math.ceil(data.main.temp),
          icon: "",
        };
      });

    const sunrise = convertTimestampToTime(currentData.sys.sunrise);
    const sunset = convertTimestampToTime(currentData.sys.sunset);

    return {
      currentData: {
        name: currentData.name,
        sunrise,
        sunset,
        temperature: Math.ceil(currentData.main.temp),
        minTemp: Math.ceil(currentData.main.temp_min),
        maxTemp: Math.ceil(currentData.main.temp_max),
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        pressure: currentData.main.pressure,
        humidity: currentData.main.humidity,
        visibility: currentData.visibility,
      },
      forecastData: fiveDayForecast,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const fetchWeatherDataByCity = async (searchQuery: string) => {
  if (!searchQuery) {
    console.warn("Invalid city name provided.");
    return {};
  }

  try {
    if (isDevMode) {
      console.log("Using mock weather data");
      return mockWeatherData;
    }

    const currentWeatherURL = `${CURRENT_WEATHER_URL}/?q=${searchQuery}&appid=${API_KEY}&units=metric`;
    const forecastWeatherURL = `${FORECAST_URL}/?q=${searchQuery}&appid=${API_KEY}&units=metric`;

    const [current, forecast] = await Promise.all([
      axios.get(currentWeatherURL),
      axios.get(forecastWeatherURL),
    ]);

    const { data: currentData } = current;
    const { data: forecastData } = forecast;

    const fiveDayForecast: Forecast[] = forecastData.list
      .slice(0, 5)
      .map((data, index: number) => {
        return {
          date: data.dt,
          temperature: Math.ceil(data.main.temp),
          icon: "",
        };
      });

    const sunrise = convertTimestampToTime(currentData.sys.sunrise);
    const sunset = convertTimestampToTime(currentData.sys.sunset);

    return {
      currentData: {
        name: currentData.name,
        sunrise,
        sunset,
        temperature: Math.ceil(currentData.main.temp),
        minTemp: Math.ceil(currentData.main.temp_min),
        maxTemp: Math.ceil(currentData.main.temp_max),
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        pressure: currentData.main.pressure,
        humidity: currentData.main.humidity,
        visibility: currentData.visibility,
      },
      forecastData: fiveDayForecast,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};
