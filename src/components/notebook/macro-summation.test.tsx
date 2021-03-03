import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MacroSummation } from "./macro-summation";
import { TrayObject, AnimalType } from "../../utils/sim-utils";
import { getPTIScore } from "../../utils/macro-utils";

const trayObjectsExcellent: TrayObject[] = [
  { type: AnimalType.aquaticWorm, count: 4, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.caddisFly, count: 9, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.clamOrMussel, count: 2, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.crayFish, count: 5, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.dobsonFly, count: 3, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.dragonFly, count: 6, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.mayFly, count: 13, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.riffleBeetle, count: 8, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.scud, count: 10, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.stoneFly, count: 5, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
];

const trayObjectsGood: TrayObject[] = [
  { type: AnimalType.aquaticWorm, count: 4, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.caddisFly, count: 8, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.clamOrMussel, count: 3, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.crayFish, count: 3, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.dobsonFly, count: 3, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.dragonFly, count: 5, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.mayFly, count: 11, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.riffleBeetle, count: 9, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.scud, count: 13, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
];
const trayObjectsFair: TrayObject[] = [
  { type: AnimalType.aquaticWorm, count: 7, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.blackFly, count: 29, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.clamOrMussel, count: 3, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.leech, count: 1, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.dragonFly, count: 1, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.midgeFly, count: 18, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.planarian, count: 5, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.scud, count: 4, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
];
const trayObjectsPoor: TrayObject[] = [
  { type: AnimalType.aquaticWorm, count: 10, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.blackFly, count: 13, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.leech, count: 2, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.midgeFly, count: 44, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.planarian, count: 5, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
  { type: AnimalType.scud, count: 4, collected: true, image: "", selectionPath: "", zIndex: 0,
    trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0, rotation: 0 },
];

describe("Macro Summation component", () => {
  it("renders macro summation with excellent score", () => {
    render(<MacroSummation trayObjects={trayObjectsExcellent} />);
    expect(screen.getAllByTestId("macro-summation")).toHaveLength(1);
    expect(screen.getAllByTestId("macro-summation-header")).toHaveLength(1);
    expect(screen.getAllByTestId("macro-summation-summary")).toHaveLength(1);
    const excellentScore = getPTIScore(trayObjectsExcellent);
    expect(screen.getAllByText(excellentScore)).toHaveLength(1);
  });
  it("renders macro summation with good score", () => {
    render(<MacroSummation trayObjects={trayObjectsGood} />);
    const goodScore = getPTIScore(trayObjectsGood);
    expect(screen.getAllByText(goodScore)).toHaveLength(1);
  });
  it("renders macro summation with fair score", () => {
    render(<MacroSummation trayObjects={trayObjectsFair} />);
    const fairScore = getPTIScore(trayObjectsFair);
    expect(screen.getAllByText(fairScore)).toHaveLength(1);
  });
  it("renders macro summation with poor score", () => {
    render(<MacroSummation trayObjects={trayObjectsPoor} />);
    const poorScore = getPTIScore(trayObjectsPoor);
    expect(screen.getAllByText(poorScore)).toHaveLength(1);
  });
});
