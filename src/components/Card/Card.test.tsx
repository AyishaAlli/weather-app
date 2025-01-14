import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card Component", () => {
  it("renders correctly", () => {
    render(
      <Card title="Test Title">
        <p>Child Content</p>
      </Card>
    );

    expect(screen.getByText("Test Title")).toBeDefined();
  });

  it("renders children correctly", () => {
    render(
      <Card>
        <p>Test Content</p>
      </Card>
    );

    expect(screen.getByText("Test Content")).toBeDefined();
  });

  it("does not render a title element when title is not provided", () => {
    render(
      <Card>
        <p>No Title Here</p>
      </Card>
    );

    expect(screen.queryByRole("heading", { level: 2 })).toBeNull();
  });
});
