import React from "react";
import { render, screen } from "@testing-library/react";
import { MacroSummation } from "./macro-summation";
import { TrayObject, AnimalType } from "../../utils/sim-utils";
import { getPTIScore } from "../../utils/macro-utils";

const testTrayObject = (type: AnimalType, count: number): TrayObject => {
  return { type, count, trayIndex: 0, left: 0, top: 0, width: 0, height: 0, boundingBoxHeight: 0, boundingBoxWidth: 0,
           rotation: 0, collected: true, selectionPath: "", zIndex: 0, image: "" };
};

const trayObjectsExcellent: TrayObject[] = [
  testTrayObject(AnimalType.aquaticWorm, 4),
  testTrayObject(AnimalType.caddisFly, 9),
  testTrayObject(AnimalType.clamOrMussel, 2),
  testTrayObject(AnimalType.crayFish, 5),
  testTrayObject(AnimalType.dobsonFly, 3),
  testTrayObject(AnimalType.dragonFly, 6),
  testTrayObject(AnimalType.mayFly, 13),
  testTrayObject(AnimalType.riffleBeetle, 8),
  testTrayObject(AnimalType.scud, 10),
  testTrayObject(AnimalType.stoneFly, 5),
];
const trayObjectsGood: TrayObject[] = [
  testTrayObject(AnimalType.aquaticWorm, 4),
  testTrayObject(AnimalType.caddisFly, 8),
  testTrayObject(AnimalType.clamOrMussel, 3),
  testTrayObject(AnimalType.crayFish, 3),
  testTrayObject(AnimalType.dobsonFly, 3),
  testTrayObject(AnimalType.dragonFly, 5),
  testTrayObject(AnimalType.mayFly, 11),
  testTrayObject(AnimalType.riffleBeetle, 9),
  testTrayObject(AnimalType.scud, 13),
];
const trayObjectsFair: TrayObject[] = [
  testTrayObject(AnimalType.aquaticWorm, 7),
  testTrayObject(AnimalType.blackFly, 29),
  testTrayObject(AnimalType.clamOrMussel, 3),
  testTrayObject(AnimalType.leech, 1),
  testTrayObject(AnimalType.dragonFly, 1),
  testTrayObject(AnimalType.midgeFly, 18),
  testTrayObject(AnimalType.planarian, 5),
  testTrayObject(AnimalType.scud, 4),
];
const trayObjectsPoor: TrayObject[] = [
  testTrayObject(AnimalType.aquaticWorm, 10),
  testTrayObject(AnimalType.blackFly, 13),
  testTrayObject(AnimalType.leech, 2),
  testTrayObject(AnimalType.midgeFly, 44),
  testTrayObject(AnimalType.planarian, 5),
  testTrayObject(AnimalType.scud, 4),
];

describe("Macro Summation component", () => {
  it("renders macro summation with excellent score", () => {
    render(<MacroSummation trayObjects={trayObjectsExcellent} />);
    expect(screen.getByTestId("macro-summation")).toBeInTheDocument();
    expect(screen.getByTestId("macro-summation-header")).toBeInTheDocument();
    expect(screen.getByTestId("macro-summation-summary")).toBeInTheDocument();
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
