export function decimalToTime(decimal: number | undefined): string {
  if (decimal === undefined) return "N/A";
  const referenceDate = new Date("1900-01-01T00:00:00Z");
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const date = new Date(referenceDate.getTime() + decimal * millisecondsInDay);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
