import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoadingComponent } from "./Loading";

describe("LoadingComponent", () => {
  it("renders correctly", () => {
    render(<LoadingComponent loaderType="small" />);

    expect(screen.getByTestId("loading-spinner")).toBeDefined();
  });
});
