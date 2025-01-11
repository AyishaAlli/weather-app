import fetchWeatherData from "../services/meteomatics";
import { Coordinates, Forecast } from "../types/weather";

export const getWeatherForecast = async (coordinates: Coordinates) => {
  if (!coordinates) return null;

  const now = new Date();
  const startDate = now.toISOString().split(".")[0] + "Z";
  const endDate =
    new Date(now.setDate(now.getDate() + 6)).toISOString().split(".")[0] + "Z";

  // API URL
  const url = `${startDate}--${endDate}:P1D/t_2m:C,t_2m_min_1d_sot:idx,t_2m_max_1d_sot:idx,sunrise:dn,sunset:dn,weather_symbol_1h:idx/${coordinates.lat},${coordinates.lng}/json?model=mix`;

  const response = await fetchWeatherData(url);

  const forecastData = response.data[0].coordinates[0].dates.slice(1);
  const sixDaysForecast: Forecast[] = forecastData.map((data) => ({
    date: data.date,
    temperature: data.value,
  }));

  const sunrise = decimalToTime(response.data[3].coordinates[0].dates[0].value);
  const sunset = decimalToTime(response.data[4].coordinates[0].dates[0].value);

  return {
    cityName: coordinates.city_name,
    temperature: Math.ceil(response.data[0].coordinates[0].dates[0].value),
    sunrise,
    sunset,
    forecast: sixDaysForecast,
    icon: "",
  };
};

export function decimalToTime(decimal: number | undefined): string {
  if (decimal === undefined) return "N/A";
  const referenceDate = new Date("1900-01-01T00:00:00Z");
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const date = new Date(referenceDate.getTime() + decimal * millisecondsInDay);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function getDayOfTheWeek(date: string) {
  const day = new Date(date);
  // explicitly defines the type for the options object
  const options: Intl.DateTimeFormatOptions = { weekday: "long" };
  return day.toLocaleString("en-GB", options);
}
