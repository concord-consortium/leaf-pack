import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LeafDecompositionType, LeafEatersAmountType, AlgaeEatersAmountType, FishAmountType } from "../../utils/sim-utils";
import { ScalePanel } from "./scale-panel";

describe("Scale Panel component", () => {
  it("renders scale panel", () => {
    render(<ScalePanel
            leafDecomposition={LeafDecompositionType.little}
            leafEaters={LeafEatersAmountType.few}
            algaeEaters={AlgaeEatersAmountType.few}
            fish={FishAmountType.few}
            isRunning={true}
           />);
    expect(screen.getByText("Leaf Decomposition")).toBeInTheDocument();
    expect(screen.getByText("Tiny Animal X")).toBeInTheDocument();
    expect(screen.getByText("Tiny Animal Y")).toBeInTheDocument();
    expect(screen.getByText("Fish")).toBeInTheDocument();
    expect(screen.getAllByTestId("scale")).toHaveLength(4);
  });
});
