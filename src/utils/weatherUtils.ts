import { Forecast } from "../types/weather";
import { convertTimestampToTime } from "./utils";

export function processWeatherData(currentData, forecastData) {
  const sunrise = convertTimestampToTime(currentData.sys.sunrise);
  const sunset = convertTimestampToTime(currentData.sys.sunset);
  const name = `${currentData?.name ?? "Unknown City"}, ${
    currentData?.sys?.country ?? "Unknown Country"
  }`;

  const fiveDayForecast: Forecast[] = forecastData.list
    .slice(0, 5)
    .map((data) => {
      return {
        date: data.dt,
        temperature: Math.ceil(data.main.temp),
        icon: "",
      };
    });

  return {
    currentData: {
      name,
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
}
