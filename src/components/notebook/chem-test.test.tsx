import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChemTest } from "./chem-test";
import { chemistryTests, chemistryFinalValues } from "../../utils/chem-utils";
import { EnvironmentType } from "../../utils/environment";
import { ChemistryTestResult, ChemTestType } from "../../utils/chem-types";
import { phTest } from "../../chem-tests/ph";

const handleUpdateTest = jest.fn();

describe("Chem Test component", () => {
  it("renders chem test", () => {
    const testIndex = 0;
    render(<ChemTest
      chemistryTest={chemistryTests[testIndex]}
      testIndex={testIndex}
      chemistryTestResults={[]}
      onUpdateTestResult={handleUpdateTest}
    />);
    expect(screen.getByTestId("chem-test")).toBeInTheDocument();
    const numSteps = chemistryTests[testIndex].steps.length;
    expect(screen.getAllByTestId("step-button")).toHaveLength(numSteps);
    expect(screen.queryByTestId("step-check")).toBeNull();
  });
  it("renders incomplete chem test", () => {
    const testIndex = 2;
    const testResults: ChemistryTestResult[] = [{
      type: ChemTestType.pH,
      currentStep: 0,
      stepsComplete: 1,
      value: phTest.results[0].value }];
    render(<ChemTest
      chemistryTest={chemistryTests[testIndex]}
      testIndex={testIndex}
      chemistryTestResults={testResults}
      chemistryValues={chemistryFinalValues[EnvironmentType.environment1]}
      onUpdateTestResult={handleUpdateTest}
    />);
    expect(screen.getAllByTestId("step-check")).toHaveLength(1);
    expect(screen.queryByTestId("chem-slider")).toBeNull();
    expect(screen.queryByTestId("input-result")).toBeNull();
  });
  it("renders complete chem test", () => {
    const testIndex = 2;
    const testResults: ChemistryTestResult[] = [{
      type: ChemTestType.pH,
      currentStep: phTest.steps.length - 1,
      stepsComplete: phTest.steps.length,
      value: phTest.results[0].value }];
    render(<ChemTest
      chemistryTest={chemistryTests[testIndex]}
      testIndex={testIndex}
      chemistryTestResults={testResults}
      chemistryValues={chemistryFinalValues[EnvironmentType.environment1]}
      onUpdateTestResult={handleUpdateTest}
    />);
    const numSteps = chemistryTests[testIndex].steps.length;
    expect(screen.getAllByTestId("step-check")).toHaveLength(numSteps);
    expect(screen.getByTestId("chem-slider")).toBeInTheDocument();
    expect(screen.getByTestId("input-result")).toBeInTheDocument();
  });
  it("allows chem test step button to be clicked", () => {
    const testIndex = 2;
    const testResults: ChemistryTestResult[] =
      [{ type: ChemTestType.pH, stepsComplete: 0 }];
    render(<ChemTest
      chemistryTest={chemistryTests[testIndex]}
      testIndex={testIndex}
      chemistryTestResults={testResults}
      chemistryValues={chemistryFinalValues[EnvironmentType.environment1]}
      onUpdateTestResult={handleUpdateTest}
    />);
    fireEvent.click(screen.getAllByTestId("step-button")[0]);
    expect(handleUpdateTest).toHaveBeenCalledTimes(1);
  });
});
