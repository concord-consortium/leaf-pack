import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MacroPanel } from "./macro-panel";
import { TrayObject, AnimalType } from "../../utils/sim-utils";

const trayObjects: TrayObject[] = [
  { type: AnimalType.aquaticWorm, count: 10, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
];

jest.mock("react-dnd", () => ({
  useDrop: () => [{ isOver: false }, () => null]
}));

describe("Macro Panel component", () => {
  it("renders macro panel", () => {
    render(<MacroPanel trayObjects={trayObjects} onCategorizeAnimal={()=>{/*no-op*/}} />);
    expect(screen.getByTestId("macro-panel")).toBeInTheDocument();
    expect(screen.queryByTestId("macro-summation")).toBeNull();
    // verify rows appear
    expect(screen.getByTestId("critter-aquaticWorm")).toBeInTheDocument();
    expect(screen.getByTestId("critter-blackFly")).toBeInTheDocument();
    expect(screen.getByTestId("critter-caddisFly")).toBeInTheDocument();
    expect(screen.getByTestId("critter-clamOrMussel")).toBeInTheDocument();
    expect(screen.getByTestId("critter-crayFish")).toBeInTheDocument();
    // click section button to display summary page
    fireEvent.click(screen.getByText("4"));
    expect(screen.getByTestId("macro-summation")).toBeInTheDocument();
  });
});
