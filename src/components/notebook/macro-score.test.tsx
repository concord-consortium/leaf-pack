import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MacroScore } from "./macro-score";
import { PTIRatingLevels } from "../../utils/macro-utils";

describe("Macro Score component", () => {
  it("renders macro score", () => {
    render(<MacroScore score={24} ratingIndex={0} />);
    expect(screen.getAllByTestId("macro-score")).toHaveLength(1);
    expect(screen.getByText("24")).toBeInTheDocument();
  });
  it("renders macro score rating level excellent with correct color", () => {
    const ratingIndex = 0;
    render(<MacroScore score={24} ratingIndex={ratingIndex} />);
    expect(screen.getByTestId("macro-score-pti")).toHaveStyle(`background-color: ${PTIRatingLevels[ratingIndex].color}`);
  });
  it("renders macro score rating level good with correct color", () => {
    const ratingIndex = 1;
    render(<MacroScore score={17} ratingIndex={ratingIndex} />);
    expect(screen.getByTestId("macro-score-pti")).toHaveStyle(`background-color: ${PTIRatingLevels[ratingIndex].color}`);
  });
  it("renders macro score rating level fair with correct color", () => {
    const ratingIndex = 2;
    render(<MacroScore score={11} ratingIndex={ratingIndex} />);
    expect(screen.getByTestId("macro-score-pti")).toHaveStyle(`background-color: ${PTIRatingLevels[ratingIndex].color}`);
  });
  it("renders macro score rating level poor with correct color", () => {
    const ratingIndex = 3;
    render(<MacroScore score={0} ratingIndex={ratingIndex} />);
    expect(screen.getByTestId("macro-score-pti")).toHaveStyle(`background-color: ${PTIRatingLevels[ratingIndex].color}`);
  });
});
