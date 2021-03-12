import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

const handleUpdateTest = jest.fn();

describe("Tray Image component", () => {
  // it("renders tray image", () => {
  //   const testIndex = 0;
  //   render(<ChemTest
  //     chemistryTest={chemistryTests[testIndex]}
  //     testIndex={testIndex}
  //     chemistryTestResults={[]}
  //     onUpdateTestResult={handleUpdateTest}
  //   />);
  //   expect(screen.getByTestId("chem-test")).toBeInTheDocument();
  //   const numSteps = chemistryTests[testIndex].steps.length;
  //   expect(screen.getAllByTestId("step-button")).toHaveLength(numSteps);
  //   expect(screen.queryByTestId("step-check")).toBeNull();
  // });
  // it("allows chem test step button to be clicked", () => {
  //   const testIndex = 2;
  //   const testResults: ChemistryTestResult[] =
  //     [{ type: ChemTestType.pH, stepsComplete: 0 }];
  //   render(<ChemTest
  //     chemistryTest={chemistryTests[testIndex]}
  //     testIndex={testIndex}
  //     chemistryTestResults={testResults}
  //     chemistryValues={chemistryFinalValues[EnvironmentType.environment1]}
  //     onUpdateTestResult={handleUpdateTest}
  //   />);
  //   fireEvent.click(screen.getAllByTestId("step-button")[0]);
  //   expect(handleUpdateTest).toHaveBeenCalledTimes(1);
  // });
});
