import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Thumbnail } from "./thumbnail";
import { IContainer } from "../../hooks/use-model-state";
import { IModelInputState, IModelOutputState } from "../../leaf-model-types";
import { AlgaeEatersAmountType, EnvironmentType, FishAmountType, LeafDecompositionType, LeafEatersAmountType } from "../../utils/sim-utils";

describe("Thumbnail component", () => {
  const emptyContainer: IContainer<IModelInputState, IModelOutputState> = {
    inputState: { environment: EnvironmentType.environment1, sunnyDayFequency: 0 },
    outputState: {
      leafDecomposition: LeafDecompositionType.little,
      leafEaters: LeafEatersAmountType.few,
      algaeEaters: AlgaeEatersAmountType.few,
      fish: FishAmountType.few,
      animalInstances: [],
      showTray: false,
      trayObjects: [],
      habitatFeatures: new Set(),
      chemistryTestResults: [] },
    simulationState: { isRunning: false, isPaused: false, isFinished: true },
    isSaved: true
  };

  it("renders empty thumbnail", () => {
    render(<Thumbnail container={emptyContainer} />);
    expect(screen.getByTestId("sunny-days-label")).toHaveTextContent("F");
    expect(screen.getByTestId("pollution-tolerance-label")).toHaveTextContent("");
    expect(screen.getByTestId("habitat-icon")).not.toBeVisible();
    expect(screen.getByTestId("macroinvertebrates-icon")).not.toBeVisible();
    expect(screen.getByTestId("chemistry-icon")).not.toBeVisible();
  });
});
