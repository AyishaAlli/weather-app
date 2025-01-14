import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { DailyForecast } from "./DailyForecast";
import { Forecast } from "../../types/weather";

vi.mock("../../utils/utils", () => ({
  getDayOfTheWeek: vi.fn(() => "Monday"),
}));

describe("DailyForecast Component", () => {
  const mockData: Forecast[] = [
    { date: "2025-01-14", temperature: 15.5, icon: "icon1.png" },
    { date: "2025-01-15", temperature: 10.2, icon: "icon2.png" },
  ];

  it("renders correctly", () => {
    render(<DailyForecast data={mockData} />);

    expect(screen.getAllByText("Monday")).toHaveLength(2);
    expect(screen.getByText("16°c")).toBeDefined();
    expect(screen.getByText("11°c")).toBeDefined();
  });

  it("renders the correct number of forecast cards", () => {
    render(<DailyForecast data={mockData} />);
    const forecastCards = screen.getAllByRole("img", { name: "weather-icon" });
    expect(forecastCards).toHaveLength(2);
  });
});
