import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChemistryPanel } from "./chemistry-panel";
import { chemistryTests } from "../../utils/chem-utils";

describe("Chemistry Panel component", () => {
  it("renders chemistry panel", () => {
    render(<ChemistryPanel chemistryTestResults={[]} onUpdateTestResult={()=>{/*no-op*/}} />);
    expect(screen.getByTestId("chemistry-panel")).toBeInTheDocument();
    expect(screen.getByTestId("chem-results")).toBeInTheDocument();
    expect(screen.queryByTestId("chem-test")).toBeNull();
    expect(screen.getAllByTestId("section-numeric-button")).toHaveLength(chemistryTests.length + 1);
    expect(screen.getAllByTestId("section-home-button")).toHaveLength(1);
  });
  it("allow section navigation on chemistry panel", () => {
    render(<ChemistryPanel chemistryTestResults={[]} onUpdateTestResult={()=>{/*no-op*/}} />);
    // click section button to display chem test page
    fireEvent.click(screen.getAllByTestId("section-numeric-button")[1]);
    expect(screen.queryByTestId("chem-results")).toBeNull();
    expect(screen.getByTestId("chem-test")).toBeInTheDocument();
    // click section button to return to results page
    fireEvent.click(screen.getAllByTestId("section-numeric-button")[0]);
    expect(screen.getByTestId("chem-results")).toBeInTheDocument();
    expect(screen.queryByTestId("chem-test")).toBeNull();
  });
});
