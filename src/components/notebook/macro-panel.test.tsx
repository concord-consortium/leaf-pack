import React from "react";
import "@testing-library/jest-dom";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { render, screen, fireEvent } from "@testing-library/react";
import { MacroPanel } from "./macro-panel";
import { TrayObject, AnimalType } from "../../utils/sim-utils";

const trayObjects: TrayObject[] = [
  { type: AnimalType.aquaticWorm, count: 10, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
];

describe("Macro Panel component", () => {
  it("renders macro panel", () => {
    render(
      <DndProvider backend={TouchBackend} options={{enableMouseEvents: true}} >
        <MacroPanel trayObjects={trayObjects} onCategorizeAnimal={()=>{/*no-op*/}} />
      </DndProvider>
    );
    expect(screen.getAllByTestId("macro-panel")).toHaveLength(1);
    expect(screen.queryByTestId("macro-summation")).toBeNull();
    // verify rows appear
    expect(screen.getAllByTestId("critter-aquaticWorm")).toHaveLength(1);
    expect(screen.getAllByTestId("critter-blackFly")).toHaveLength(1);
    expect(screen.getAllByTestId("critter-caddisFly")).toHaveLength(1);
    expect(screen.getAllByTestId("critter-clamOrMussel")).toHaveLength(1);
    expect(screen.getAllByTestId("critter-crayFish")).toHaveLength(1);
    // click section button to display summary page
    fireEvent.click(screen.getByText("4"));
    expect(screen.getAllByTestId("macro-summation")).toHaveLength(1);
  });
});
