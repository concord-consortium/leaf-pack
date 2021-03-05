import React from "react";
import { render, screen } from "@testing-library/react";
import { ChemResults } from "./chem-results";
import { ChemistryTestResult, ChemTestType } from "../../utils/chem-types";
import { chemistryTests, chemTestRatings } from "../../utils/chem-utils";
import { airTemperatureTest } from "../../chem-tests/air-temperature";
import { phTest } from "../../chem-tests/ph";

const testResult: ChemistryTestResult = { type: ChemTestType.pH,
  currentStep: phTest.steps.length,
  stepsComplete: phTest.steps.length,
  value: phTest.results[0].value };
const unratedResult: ChemistryTestResult = { type: ChemTestType.airTemperature,
   currentStep: airTemperatureTest.steps.length,
   stepsComplete: airTemperatureTest.steps.length,
   value: airTemperatureTest.results[0].value };

describe("Chem Results component", () => {
  it("renders chem results", () => {
    render(<ChemResults chemistryTestResults={[unratedResult, testResult]} />);
    expect(screen.getByTestId("chem-results")).toBeInTheDocument();
    // 2 complete, 4 incomplete tests
    expect(screen.getAllByTestId("chem-results-result-row")).toHaveLength(6);
    expect(screen.getAllByTestId("chem-results-complete")).toHaveLength(2);
    expect(screen.getAllByTestId("chem-results-incomplete")).toHaveLength(4);
  });
  it("renders unstarted chem results", () => {
    render(<ChemResults chemistryTestResults={[]} />);
    expect(screen.getByTestId("chem-results")).toBeInTheDocument();
    // 6 incomplete tests
    expect(screen.getAllByTestId("chem-results-result-row")).toHaveLength(6);
    expect(screen.getAllByTestId("chem-results-incomplete")).toHaveLength(6);
  });
});
