import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { SectionButtons } from "./section-buttons";

describe("Section Buttons component", () => {
  it("renders section buttons", () => {
    render(<SectionButtons onSelectSection={()=>{/*no-op*/}} currentSection={0} totalSections={5} showHomeButton={false} />);
    expect(screen.getAllByTestId("section-numeric-button")).toHaveLength(5);
    expect(screen.queryByTestId("section-home-button")).toBeNull();
  });
  it("renders section buttons with home button", () => {
    render(<SectionButtons onSelectSection={()=>{/*no-op*/}} currentSection={0} totalSections={5} showHomeButton={true} />);
    expect(screen.getAllByTestId("section-numeric-button")).toHaveLength(5);
    expect(screen.getAllByTestId("section-home-button")).toHaveLength(1);
  });
  it("allows section buttons to be clicked", () => {
    const handleSelectSection = jest.fn();
    render(<SectionButtons onSelectSection={handleSelectSection} currentSection={0} totalSections={5} showHomeButton={false} />);
    fireEvent.click(screen.getByText("1"));
    expect(handleSelectSection).toHaveBeenCalledTimes(1);
  });
});
