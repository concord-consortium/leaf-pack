import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LeafDecompositions, LeafDecomposition } from "../../utils/sim-utils";
import { Scale } from "./scale";

describe("Scale component", () => {
  it("renders scale", () => {
    render(<Scale
            label={"Leaf Decomposition"}
            scaleDisplay={LeafDecompositions.map((item: LeafDecomposition) => item.scaleDisplay)}
            scaleIndex={0}
            isRunning={true}
           />);
    expect(screen.getByText("Leaf Decomposition")).toBeInTheDocument();
    expect(screen.getAllByTestId("scale-block")).toHaveLength(3);
  });
});
