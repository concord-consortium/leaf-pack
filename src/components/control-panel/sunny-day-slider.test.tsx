import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { SunnyDaySlider } from "./sunny-day-slider";

describe("Sunny Day Slider component", () => {
  it("renders sunny day slider", () => {
    render(<SunnyDaySlider onChangeSunnyDaySlider={()=>{/*no-op*/}} sunnyDayFequency={0} disabled={false} />);
    expect(screen.getAllByTestId("sunny-day-slider")).toHaveLength(1);
    expect(screen.getByText("Many")).toBeInTheDocument();
    expect(screen.getByText("Few")).toBeInTheDocument();
  });
});
