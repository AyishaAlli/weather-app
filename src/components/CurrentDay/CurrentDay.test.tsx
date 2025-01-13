import { cleanup, render, screen } from "@testing-library/react";
import CurrentDaySection from "./CurrentDay";

describe("CurrentDay Component", () => {
  const mockData = {
    name: "London",
    icon: "test-icon-url",
    description: "Partly Cloudy",
    temperature: 22,
    pressure: 1013,
    humidity: 60,
    visibility: 10,
    sunrise: "06:30",
    sunset: "18:45",
  };

  beforeEach(() => cleanup());

  const renderComponent = () => {
    return render(<CurrentDaySection data={mockData} />);
  };

  it("renders location name", () => {
    renderComponent();
    expect(screen.getByText(mockData.name)).toBeDefined();
  });

  it("renders weather description and temperature", () => {
    renderComponent();
    expect(screen.getByText(mockData.description)).toBeDefined();
    expect(screen.getByText(`${mockData.temperature}°c`)).toBeDefined();
  });

  it("renders weather info labels and values", () => {
    renderComponent();

    expect(screen.getByText("Pressure")).toBeDefined();
    expect(screen.getByText("1013 hPa")).toBeDefined();

    expect(screen.getByText("Humidity")).toBeDefined();
    expect(screen.getByText("60%")).toBeDefined();

    expect(screen.getByText("Visibility")).toBeDefined();
    expect(screen.getByText("10 km")).toBeDefined();
  });
});
