import { render, screen } from "@testing-library/react";
import NavBar from "../NavBar/NavBar";
import { describe, it, expect, vi, afterEach } from "vitest";

describe("NavBar", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (props?: { [key: string]: unknown }) => {
    const mockOnSearch = vi.fn();
    render(<NavBar onSearch={mockOnSearch} cityName="London" {...props} />);
  };
  it("should render", async () => {
    renderComponent();

    expect(screen.getByText("London")).toBeDefined();
    expect(screen.getByText("Search")).toBeDefined();
  });
});
