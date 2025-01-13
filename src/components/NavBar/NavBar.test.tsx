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
    render(<NavBar onSearch={mockOnSearch} cityName="London" {...props} />);
    return mockOnSearch;
  };

  beforeEach(() => cleanup());

  it("should render", async () => {
    renderComponent();

    expect(screen.getByText("London")).toBeDefined();
    expect(screen.getByText("Search")).toBeDefined();
  });

  // it("calls onSearch when input changes", () => {
  //   const mockOnSearch = vi.fn();
  //   renderComponent({ onSearch: mockOnSearch });

  //   const searchInput = screen.getByTestId("city-input");
  //   const searchButton = screen.getByTestId("search-button");

  //   fireEvent.change(searchInput, { target: { value: "New York" } });
  //   fireEvent.click(searchButton);

  //   expect(mockOnSearch).toHaveBeenCalledWith("New York");
  //   expect(screen.getByText("New York")).toBeDefined();
  // });

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

  it("does not call onSearch when input is empty and form is submitted", async () => {
    const mockOnSearch = renderComponent();

    fireEvent.change(screen.getByTestId("city-input"), {
      target: { value: "" },
    });
    fireEvent.click(screen.getByTestId("search-button"));

    await waitFor(() => {
      expect(mockOnSearch).not.toHaveBeenCalled();
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

  it("does not call onSearch when Enter key is pressed with an empty input", async () => {
    const mockOnSearch = renderComponent();

    fireEvent.keyUp(screen.getByTestId("city-input"), {
      key: "Enter",
      code: "Enter",
    });

    await waitFor(() => {
      expect(mockOnSearch).not.toHaveBeenCalled();
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
