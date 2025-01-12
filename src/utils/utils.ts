import fetchWeatherData from "../services/meteomatics";
import { Coordinates, Forecast } from "../types/weather";
import { weatherIcons } from "./weatherIcons";

export const getWeatherForecast = async (coordinates: Coordinates) => {
  if (!coordinates) return null;

  const now = new Date();
  const startDate = now.toISOString().split(".")[0] + "Z";
  const endDate =
    new Date(now.setDate(now.getDate() + 6)).toISOString().split(".")[0] + "Z";

  const url = `${startDate}--${endDate}:P1D/t_2m:C,t_2m_min_1d_sot:idx,t_2m_max_1d_sot:idx,sunrise:dn,sunset:dn,weather_symbol_1h:idx/${coordinates.lat},${coordinates.lng}/json?model=mix`;

  const response = await fetchWeatherData(url);

  // Extracting the data from the API response
  const dates = response.data[0].coordinates[0].dates;
  const weatherSymbolCodes = response.data[5].coordinates[0].dates;

  const sixDaysForecast: Forecast[] = dates.map((data, index: number) => {
    const weatherCode = weatherSymbolCodes[index].value;
    const weatherIcon = weatherIcons[weatherCode];

    return {
      date: data.date,
      temperature: data.value,

      icon: weatherIcon,
    };
  });

  const sunrise = decimalToTime(response.data[3].coordinates[0].dates[0].value);
  const sunset = decimalToTime(response.data[4].coordinates[0].dates[0].value);
  const weatherCode = response.data[5].coordinates[0].dates[0].value;

  return {
    cityName: coordinates.city_name,
    temperature: Math.ceil(response.data[0].coordinates[0].dates[0].value),
    sunrise,
    sunset,
    forecast: sixDaysForecast,
    icon: weatherIcons[weatherCode],
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
