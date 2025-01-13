import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../NavBar/NavBar";
import { describe, it, expect, vi } from "vitest";

describe("NavBar Component", () => {
  it("renders without crashing", () => {
    render(<NavBar onSearch={() => {}} cityName="London" />);
    expect(screen.getByText("London")).toBeDefined();
  });

  it("renders the city name when provided", () => {
    render(<NavBar onSearch={() => {}} cityName="New York" />);
    expect(screen.getByText("New York")).toBeDefined();
  });

  it("calls onSearch with the correct city input value", () => {
    const mockOnSearch = vi.fn();

    render(<NavBar onSearch={mockOnSearch} cityName="Paris" />);

    const input = screen.getByTestId("city-input");
    fireEvent.change(input, { target: { value: "Berlin" } });

    const searchButton = screen.getByRole("button", { name: /search/i });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith("Berlin");
  });

  it("renders the search input and button", () => {
    render(<NavBar onSearch={() => {}} cityName="Tokyo" />);

    expect(screen.getByRole("text")).toBeDefined();
    expect(screen.getByRole("button", { name: /Search/i })).toBeDefined();
  });
});
