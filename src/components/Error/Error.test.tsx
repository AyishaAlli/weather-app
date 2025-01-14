import { render, screen } from "@testing-library/react";
import ErrorComponent from "./Error";

describe("ErrorComponent", () => {
  it("renders correctly", () => {
    render(<ErrorComponent />);

    expect(
      screen.getByText("Something went wrong. Please try again.")
    ).toBeDefined();
  });

  it("renders a custom error message when message prop is provided", () => {
    const customMessage = "Custom error message.";
    render(<ErrorComponent message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeDefined();
  });
});
