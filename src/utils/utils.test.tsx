import {
  convertTimestampToTime,
  decimalToTime,
  getDayOfTheWeek,
  getWeatherIconByCode,
} from "./utils";
import { weatherIcons } from "./weatherIcons";

describe("getWeatherIconByCode", () => {
  it("returns the correct icon image for a valid code", () => {
    const code = "01d";
    const expectedIcon = weatherIcons.find((icon) => icon.code === code)?.image;

    const result = getWeatherIconByCode(code);

    expect(result).toBe(expectedIcon);
  });

  it("returns the default unknown icon for an invalid code", () => {
    const code = "invalid-code";
    const defaultIcon = "public/assets/mm_api_symbols/wsymbol_0000_unknown.png";

    const result = getWeatherIconByCode(code);

    expect(result).toBe(defaultIcon);
  });
});

describe("decimalToTime", () => {
  it("returns the correct time for a valid decimal number", () => {
    const decimal = 0.5;
    const expectedTime = "12:00 PM";

    const result = decimalToTime(decimal);

    expect(result).toBe(expectedTime);
  });

  it('returns "N/A" if decimal is undefined', () => {
    const result = decimalToTime(undefined);

    expect(result).toBe("N/A");
  });

  it("returns the correct time for a decimal close to midnight", () => {
    const decimal = 0.0;
    const expectedTime = "12:00 AM";

    const result = decimalToTime(decimal);

    expect(result).toBe(expectedTime);
  });
});

describe("convertTimestampToTime", () => {
  it("returns the correct time for a valid timestamp", () => {
    const timestamp = 1616260800;
    const expectedTime = "17:20";

    const result = convertTimestampToTime(timestamp);

    expect(result).toBe(expectedTime);
  });

  it('returns "N/A" if timestamp is undefined', () => {
    const result = convertTimestampToTime(undefined);

    expect(result).toBe("N/A");
  });
});

describe("getDayOfTheWeek", () => {
  it("returns the correct day of the week for a valid timestamp", () => {
    const timestamp = "1616260800";
    const expectedDay = "Saturday";

    const result = getDayOfTheWeek(timestamp);

    expect(result).toBe(expectedDay);
  });

  it("returns the correct day for a different timestamp", () => {
    const timestamp = "1616092800";
    const expectedDay = "Thursday";

    const result = getDayOfTheWeek(timestamp);

    expect(result).toBe(expectedDay);
  });
});
