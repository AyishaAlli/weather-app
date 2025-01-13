import { convertTimestampToTime } from "./utils";
import { weatherIcons } from "./weatherIcons";

// Generate the 5-day forecast
export const getFiveDayForecast = (forecastData) => {
  return forecastData.list.slice(0, 5).map((data, index: number) => {
    const iconCode = weatherIcons[index];
    const icon = iconCode.image;

    return {
      date: data.dt,
      temperature: Math.ceil(data.main.temp),
      icon,
    };
  });
};

// Generate weather data format
export const proccessWeatherData = (currentData, forecastData) => {
  const fiveDayForecast = getFiveDayForecast(forecastData);

  const sunrise = convertTimestampToTime(currentData.sys.sunrise);
  const sunset = convertTimestampToTime(currentData.sys.sunset);
  const name = `${currentData?.name ?? "Unknown City"}, ${
    currentData?.sys?.country ?? "Unknown Country"
  }`;

  const iconCode = weatherIcons.find(
    (icon) => icon.code === currentData.weather[0].icon
  );
  const icon = iconCode?.image;

  return {
    currentData: {
      name,
      sunrise,
      sunset,
      temperature: Math.ceil(currentData.main.temp),
      description: currentData.weather[0].description,
      icon,
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
    forecastData: fiveDayForecast,
  };
};
