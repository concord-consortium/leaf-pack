import React from "react";
import { render, screen } from "@testing-library/react";
import { ChemTestSlider } from "./chem-test-slider";
import { phTest } from "../../chem-tests/ph";

describe("Chem test Slider component", () => {
  it("renders chem test slider", () => {
    render(<ChemTestSlider onChangeSlider={()=>{/*no-op*/}} sliderValue={0} testValues={phTest.results} units="pH" />);
    expect(screen.getByTestId("chem-slider")).toBeInTheDocument();
    expect(screen.getAllByTestId("value-container")).toHaveLength(phTest.results.length);
    phTest.results.forEach((res) => {
      expect(screen.getByText(res.value)).toBeInTheDocument();
    });
  });
});
