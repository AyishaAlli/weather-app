import { render, screen } from "@testing-library/react";
import { ExtraWeatherInfo } from "./ExtraWeatherInfo";

describe("ExtraWeatherInfo Component", () => {
  const mockData = {
    extraWeatherInfo: {
      minTemp: 10,
      maxTemp: 20,
      feelsLike: 15,
      windSpeed: 5,
      seaLevel: 1015,
      groundLevel: 1012,
    },
  };

  it("renders correctly", () => {
    render(<ExtraWeatherInfo data={mockData} />);

    expect(screen.getByText("Min Temp")).toBeDefined();
    expect(screen.getByText("10°c")).toBeDefined();
    expect(screen.getByText("Max Temp")).toBeDefined();
    expect(screen.getByText("20°c")).toBeDefined();
    expect(screen.getByText("Feels Like")).toBeDefined();
    expect(screen.getByText("15°c")).toBeDefined();
    expect(screen.getByText("Wind Speed")).toBeDefined();
    expect(screen.getByText("5m")).toBeDefined();
    expect(screen.getByText("SeaLevel")).toBeDefined();
    expect(screen.getByText("1015hPa")).toBeDefined();
    expect(screen.getByText("Gound Level")).toBeDefined();
    expect(screen.getByText("1012hPa")).toBeDefined();
  });

  it("renders all icons for weather info", () => {
    render(<ExtraWeatherInfo data={mockData} />);

    //icons
    expect(screen.getByText("Min Temp").nextSibling).toBeTruthy();
    expect(screen.getByText("Max Temp").nextSibling).toBeTruthy();
    expect(screen.getByText("Feels Like").nextSibling).toBeTruthy();
    expect(screen.getByText("Wind Speed").nextSibling).toBeTruthy();
    expect(screen.getByText("SeaLevel").nextSibling).toBeTruthy();
    expect(screen.getByText("Gound Level").nextSibling).toBeTruthy();
  });
});
