import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For jest-dom matchers
import { describe, it, expect, vi } from "vitest";
import FilterButton from "./FilterButton";

describe("FilterButton Component", () => {
  it("renders the button with the correct text", () => {
    render(<FilterButton filter="All" isActive={false} />);
    const button = screen.getByTestId("filter-button");
    expect(button).toHaveTextContent("All");
  });

  it("applies the active class when isActive is true", () => {
    render(<FilterButton filter="Active" isActive={true} />);
    const button = screen.getByTestId("filter-button");
    expect(button).toHaveClass("bg-filterButton");
  });

  it("does not apply the active class when isActive is false", () => {
    render(<FilterButton filter="Inactive" isActive={false} />);
    const button = screen.getByTestId("filter-button");
    expect(button).not.toHaveClass("bg-filterButton");
  });

  it("calls onClick when the button is clicked", () => {
    const handleClick = vi.fn();
    render(
      <FilterButton filter="Click me" isActive={false} onClick={handleClick} />
    );
    const button = screen.getByTestId("filter-button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
