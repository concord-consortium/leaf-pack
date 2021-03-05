import React from "react";
import { render, screen } from "@testing-library/react";
import { SimulationView } from "./simulation-view";
import { EnvironmentType } from "../../utils/environment";
import { FishAmountType, LeafPackState, LeafDecompositionType } from "../../utils/sim-utils";

describe("Simulation View component", () => {
  it("renders sim view", () => {
    const leafPackState: LeafPackState = { leafDecomposition: LeafDecompositionType.little, image: "", altText: "" };
    render(<SimulationView
            environment={EnvironmentType.environment1}
            leafPackState={leafPackState}
            fish={FishAmountType.none}
            onShowTray={()=>{/*no-op*/}}
            isFinished={false}
            isRunning={false}
          />);
    expect(screen.getByTestId("simulation-view")).toBeInTheDocument();
    expect(screen.getByTestId("leaf-pack")).toBeInTheDocument();
    // beaver, riffles, no fish
    expect(screen.getAllByTestId("simulation-animation")).toHaveLength(2);
  });
  it("renders sim view with few fish", () => {
    const leafPackState: LeafPackState = { leafDecomposition: LeafDecompositionType.little, image: "", altText: "" };
    render(<SimulationView
            environment={EnvironmentType.environment1}
            leafPackState={leafPackState}
            fish={FishAmountType.few}
            onShowTray={()=>{/*no-op*/}}
            isFinished={false}
            isRunning={false}
          />);
    // beaver, riffles, 1 fish
    expect(screen.getAllByTestId("simulation-animation")).toHaveLength(3);
  });
  it("renders sim view with some fish", () => {
    const leafPackState: LeafPackState = { leafDecomposition: LeafDecompositionType.little, image: "", altText: "" };
    render(<SimulationView
            environment={EnvironmentType.environment1}
            leafPackState={leafPackState}
            fish={FishAmountType.some}
            onShowTray={()=>{/*no-op*/}}
            isFinished={false}
            isRunning={false}
          />);
    // beaver, riffles, 3 fish
    expect(screen.getAllByTestId("simulation-animation")).toHaveLength(5);
  });
  it("renders sim view with many fish", () => {
    const leafPackState: LeafPackState = { leafDecomposition: LeafDecompositionType.little, image: "", altText: "" };
    render(<SimulationView
            environment={EnvironmentType.environment1}
            leafPackState={leafPackState}
            fish={FishAmountType.lots}
            onShowTray={()=>{/*no-op*/}}
            isFinished={false}
            isRunning={false}
          />);
    // beaver, riffles, 5 fish
    expect(screen.getAllByTestId("simulation-animation")).toHaveLength(7);
  });

  it("renders sim view with no animations", () => {
    const leafPackState: LeafPackState = { leafDecomposition: LeafDecompositionType.little, image: "", altText: "" };
    render(<SimulationView
            environment={EnvironmentType.environment4}
            leafPackState={leafPackState}
            fish={FishAmountType.none}
            onShowTray={()=>{/*no-op*/}}
            isFinished={false}
            isRunning={false}
          />);
    // no animations
    expect(screen.queryByTestId("simulation-animation")).toBeNull();
  });
});
