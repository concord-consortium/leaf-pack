import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MacroRating } from "./macro-rating";

describe("Macro Rating component", () => {
  it("renders macro rating", () => {
    render(<MacroRating ratingIndex={0} />);
    expect(screen.getAllByTestId("macro-rating")).toHaveLength(1);
    expect(screen.getAllByTestId("legend-block")).toHaveLength(4);
    expect(screen.getAllByTestId("legend-range")).toHaveLength(4);
  });
});
