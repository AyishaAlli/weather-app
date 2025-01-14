import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import NavBar from "../NavBar/NavBar";
import { vi } from "vitest";

describe("NavBar", () => {
  const renderComponent = (props?: { [key: string]: unknown }) => {
    const mockOnSearch = vi.fn();
    render(
      <NavBar
        searchQueary="London"
        onSearch={mockOnSearch}
        cityName="London"
        {...props}
        isLoading={false}
      />
    );
    return mockOnSearch;
  };

  beforeEach(() => cleanup());

  it("renders correctly", async () => {
    renderComponent();

    expect(screen.getByText("London")).toBeDefined();
    expect(screen.getByText("Search")).toBeDefined();
  });

  it("calls onSearch when input changes and form is submitted", async () => {
    const mockOnSearch = renderComponent();

    fireEvent.change(screen.getByTestId("city-input"), {
      target: { value: "Manchester" },
    });
    fireEvent.click(screen.getByTestId("search-button"));

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("Manchester");
    });
  });

  it("calls onSearch when Enter key is pressed with a non-empty input", async () => {
    const mockOnSearch = renderComponent();

    fireEvent.change(screen.getByTestId("city-input"), {
      target: { value: "London" },
    });
    fireEvent.keyUp(screen.getByTestId("city-input"), {
      key: "Enter",
      code: "Enter",
    });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith("London");
    });
  });

  it("displays the search icon when input is not focused", () => {
    renderComponent();

    expect(screen.getByTestId("search-icon")).toBeDefined();
  });

  it("hides the search icon when input is focused", () => {
    renderComponent();

    fireEvent.focus(screen.getByTestId("city-input"));

    expect(screen.queryByTestId("search-icon")).toBeNull();
  });
});
