import { render, screen } from "@testing-library/react";

import { OtherCitiesWeather } from "./OtherCities";

describe("OtherCitiesWeather Component", () => {
  const mockCities = [
    { name: "London", temperature: 12, description: "Cloudy" },
    { name: "Paris", temperature: 15, description: "Sunny" },
    { name: "New York", temperature: 10, description: "Rainy" },
  ];

  it("renders correctly ", () => {
    render(<OtherCitiesWeather cities={mockCities} />);

    expect(screen.getByText("Other Cities")).toBeDefined();

    mockCities.forEach((city) => {
      expect(screen.getByText(city.name)).toBeDefined();
      expect(screen.getByText(`${city.temperature}°c`)).toBeDefined();
      expect(screen.getByText(city.description)).toBeDefined();
    });
  });
});
