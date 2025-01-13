import { weatherIcons } from "./weatherIcons";

export const getWeatherIconByCode = (code: number) => {
  const weatherIcon = weatherIcons.find((icon) => icon.code === code);
  return weatherIcon
    ? weatherIcon.image
    : "src/assets/mm_api_symbols/wsymbol_0000_unknown.png";
};

export const getWeatherDescriptionByCode = (code: number) => {
  const weatherIcon = weatherIcons.find((icon) => icon.code === code);
  return weatherIcon ? weatherIcon.description : "Unknown Weather Condition";
};

export function decimalToTime(decimal: number | undefined): string {
  if (decimal === undefined) return "N/A";
  const referenceDate = new Date("1900-01-01T00:00:00Z");
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const date = new Date(referenceDate.getTime() + decimal * millisecondsInDay);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function convertTimestampToTime(number: number | undefined): string {
  if (number === undefined) return "N/A";

  const date = new Date(number * 1000); // Convert to milliseconds

  // Format time as HH:mm
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  });
}

export function getDayOfTheWeek(date: string) {
  const day = new Date(date);
  // explicitly defines the type for the options object
  const options: Intl.DateTimeFormatOptions = { weekday: "long" };
  return day.toLocaleString("en-GB", options);
}
