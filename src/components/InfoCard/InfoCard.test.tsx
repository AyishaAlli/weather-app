import { render, screen } from "@testing-library/react";
import { InfoCard } from "./InfoCard";
import { CiSun } from "react-icons/ci";

describe("InfoCard Component", () => {
  const mockProps = {
    title: "Sunrise",
    time: "06:30 AM",
    icon: <CiSun data-testid="icon-test" />,
  };

  const renderComponent = () => {
    render(<InfoCard {...mockProps} />);
  };

  it("renders correctly", () => {
    renderComponent();
    expect(screen.getByText(mockProps.title)).toBeDefined();
    expect(screen.getByText(mockProps.time)).toBeDefined();
    expect(screen.getByTestId("icon-test")).toBeDefined();
  });
});
