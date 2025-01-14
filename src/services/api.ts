import axios from "axios";
import { Forecast, GeolocationData } from "../types/weather";
import { convertTimestampToTime, getWeatherIconByCode } from "../utils/utils";
import { mockWeatherData } from "../mocks/mockData";
import { weatherIcons } from "../utils/weatherIcons";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const CURRENT_WEATHER_URL = `${BASE_URL}/weather`;
const FORECAST_URL = `${BASE_URL}/forecast`;

const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

const isDevMode = import.meta.env.VITE_APP_USE_MOCK_DATA === "true";

export const getWeatherDataByCoords = async (geoData: GeolocationData) => {
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
    const forecastWeatherURL = `${FORECAST_URL}?lat=${geoData.latitude}&lon=${geoData.longitude}&appid=${API_KEY}&units=metric`;

    const [current, forecast] = await Promise.all([
      axios.get(currentWeatherURL),
      axios.get(forecastWeatherURL),
    ]);

    const { data: currentData } = current;
    const { data: forecastData } = forecast;

    const dailyForecast: Forecast[] = forecastData.list
      .filter((_, index) => index % 8 === 0) // Filter for one point per day (8 values in a day)
      .map((data, index: number) => {
        const iconCode = weatherIcons[index];
        const icon = iconCode.image;

        return {
          date: data.dt,
          temperature: Math.ceil(data.main.temp),
          icon,
        };
      });

    const sunrise = convertTimestampToTime(currentData.sys.sunrise);
    const sunset = convertTimestampToTime(currentData.sys.sunset);

    const name = `${currentData?.name ?? "Unknown City"}, ${
      currentData?.sys?.country ?? "Unknown Country"
    }`;

    return {
      currentData: {
        name,
        sunrise,
        sunset,
        temperature: Math.ceil(currentData.main.temp),
        description: currentData.weather[0].description,
        icon: getWeatherIconByCode(currentData.weather[0].icon),
        pressure: currentData.main.pressure,
        humidity: currentData.main.humidity,
        visibility: currentData.visibility,
        extraWeatherInfo: {
          minTemp: Math.ceil(currentData.main.temp_min),
          maxTemp: Math.ceil(currentData.main.temp_max),
          feelsLike: currentData.main.feels_like,
          windSpeed: currentData.wind.speed,
          groundLevel: currentData.main.grnd_level || "N/A",
          seaLevel: currentData.main.sea_level || "N/A",
        },
      },
      forecastData: dailyForecast,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getWeatherDataByCity = async (searchQuery: string) => {
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

    const dailyForecast: Forecast[] = forecastData.list
      .filter((_, index) => index % 8 === 0) // Filter for one point per day (8 values in a day)
      .map((data, index: number) => {
        const iconCode = weatherIcons[index];
        const icon = iconCode.image;

        return {
          date: data.dt,
          temperature: Math.ceil(data.main.temp),
          icon,
        };
      });

    const sunrise = convertTimestampToTime(currentData.sys.sunrise);
    const sunset = convertTimestampToTime(currentData.sys.sunset);
    const name = `${currentData?.name ?? "Unknown City"}, ${
      currentData?.sys?.country ?? "Unknown Country"
    }`;

    return {
      currentData: {
        name,
        sunrise,
        sunset,
        temperature: Math.ceil(currentData.main.temp),
        description: currentData.weather[0].description,
        icon: getWeatherIconByCode(currentData.weather[0].icon),
        pressure: currentData.main.pressure,
        humidity: currentData.main.humidity,
        visibility: currentData.visibility,
        extraWeatherInfo: {
          minTemp: Math.ceil(currentData.main.temp_min),
          maxTemp: Math.ceil(currentData.main.temp_max),
          feelsLike: currentData.main.feels_like,
          windSpeed: currentData.wind.speed,
          groundLevel: currentData.main.grnd_level,
          seaLevel: currentData.main.sea_level,
        },
      },
      forecastData: dailyForecast,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const getCitiesData = async () => {
  const cityNames = [
    "Glasgow",
    "Manchester",
    "Sheffield",
    "Luton",
    "Milton Keynes",
    "Kent",
  ];

  try {
    const cityDataPromises = cityNames.map((city) =>
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
    );
    const cityDataResponses = await Promise.all(cityDataPromises);

    const cityData = cityDataResponses.map((response) => ({
      name: response.data.name,
      temperature: Math.ceil(response.data.main.temp),
      description: response.data.weather[0].description,
    }));

    return cityData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};
