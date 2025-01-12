import fetchWeatherData from "../services/meteomatics";
import { Coordinates, Forecast } from "../types/weather";
import { weatherIcons } from "./weatherIcons";

const getWeatherIconByCode = (code: number) => {
  const weatherIcon = weatherIcons.find((icon) => icon.code === code);
  return weatherIcon
    ? weatherIcon.image
    : "src/assets/mm_api_symbols/wsymbol_0000_unknown.png";
};

const getWeatherDescriptionByCode = (code: number) => {
  const weatherIcon = weatherIcons.find((icon) => icon.code === code);
  return weatherIcon ? weatherIcon.description : "Unknown Weather Condition";
};

export const getWeatherForecast = async (coordinates: Coordinates) => {
  if (!coordinates) return null;

  const now = new Date();
  const startDate = now.toISOString().split(".")[0] + "Z";
  const endDate =
    new Date(now.setDate(now.getDate() + 6)).toISOString().split(".")[0] + "Z";

  const url = `${startDate}--${endDate}:P1D/t_2m:C,absolute_humidity_2m:gm3,pressure_100m:Pa,visibility:m,sunrise:dn,sunset:dn,weather_symbol_1h:idx/${coordinates.lat},${coordinates.lng}/json?model=mix`;

  const response = await fetchWeatherData(url);

  // Extracting the data from the API response
  const dates = response.data[0].coordinates[0].dates;
  const weatherSymbolCodes = response.data[6].coordinates[0].dates;

  const sixDaysForecast: Forecast[] = dates.map((data, index: number) => {
    const weatherCode = weatherSymbolCodes[index].value;

    return {
      date: data.date,
      temperature: data.value,
      icon: getWeatherIconByCode(weatherCode),
    };
  });

  const sunrise = decimalToTime(response.data[4].coordinates[0].dates[0].value);
  const sunset = decimalToTime(response.data[5].coordinates[0].dates[0].value);
  const weatherCode = response.data[6].coordinates[0].dates[0].value;
  return {
    cityName: coordinates.city_name,
    temperature: Math.ceil(response.data[0].coordinates[0].dates[0].value),
    humidty: response.data[1].coordinates[0].dates[0].value,
    pressure: response.data[2].coordinates[0].dates[0].value,
    visibility: response.data[3].coordinates[0].dates[0].value,
    sunrise,
    sunset,
    forecast: sixDaysForecast,
    icon: getWeatherIconByCode(weatherCode),
    description: getWeatherDescriptionByCode(weatherCode),
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