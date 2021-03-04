import React from "react";
import { render, screen } from "@testing-library/react";
import { InputResult } from "./input-result";
import { ChemistryTestResult, ChemTestType } from "../../utils/chem-types";
import { chemistryTests, chemTestRatings } from "../../utils/chem-utils";
import { airTemperatureTest } from "../../chem-tests/air-temperature";
import { phTest } from "../../chem-tests/ph";

const testResult: ChemistryTestResult = { type: ChemTestType.pH,
                                          currentStep: phTest.steps.length - 1,
                                          stepsComplete: phTest.steps.length - 1,
                                          value: phTest.results[0].value };
const unratedResult: ChemistryTestResult = { type: ChemTestType.airTemperature,
                                           currentStep: airTemperatureTest.steps.length - 1,
                                           stepsComplete: airTemperatureTest.steps.length - 1,
                                           value: airTemperatureTest.results[0].value };

describe("Input Result component", () => {
  it("renders input result", () => {
    render(<InputResult chemistryTest={chemistryTests[2]} chemistryTestResult={testResult} />);
    expect(screen.getByTestId("input-result")).toBeInTheDocument();
    expect(screen.getByTestId("test-result")).toBeInTheDocument();
    expect(screen.getByTestId("test-rating")).toBeInTheDocument();
    const rating = chemTestRatings.find((r) => r.type === phTest.results[0].rating);
    expect(screen.getByTestId("test-rating")).toHaveStyle(`background-color: ${rating?.color}`);
    expect(screen.getByText("4 pH")).toBeInTheDocument();
    rating && expect(screen.getByText(rating?.label)).toBeInTheDocument();
  });
  it("renders unrated input result", () => {
    render(<InputResult chemistryTest={chemistryTests[0]} chemistryTestResult={unratedResult} />);
    expect(screen.queryByTestId("test-rating")).toBeNull();
  });
});
