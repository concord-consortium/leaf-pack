import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tray } from "./tray";
import { TrayObject, AnimalType } from "../../utils/sim-utils";

const handleHideTray = jest.fn();
const handleTrayObjectSelect = jest.fn();
const handleTrayObjectMove = jest.fn();

const testTrayObject = (type: AnimalType, count: number, collected: boolean): TrayObject => {
  return { type, count, collected, trayIndex: 0, left: 0, top: 0, width: 0, height: 0, rotation: 0,
           boundingBoxHeight: 0, boundingBoxWidth: 0, selectionPath: "", zIndex: 0, image: "" };
};

const trayObjects: TrayObject[] = [
  testTrayObject(AnimalType.aquaticWorm, 1, true),
  testTrayObject(AnimalType.caddisFly, 1, true),
  testTrayObject(AnimalType.clamOrMussel, 1, false),
  testTrayObject(AnimalType.crayFish, 1, false),
  testTrayObject(AnimalType.blackFly, 0, false),
  testTrayObject(AnimalType.midgeFly, 0, false),
];

jest.mock("react-dnd", () => ({
  useDrop: () => [{ isOver: false }, () => null],
  useDrag: () => [{ isDragging: false, dragPosition: null, dragSourcePosition: null }, () => null]
}));

// jest.mock("react-dnd", () => ({
//   useDrag: () => [{ isDragging: false }, () => null]
// }));

describe("Tray component", () => {
  it("renders tray", () => {
    render(<Tray
      trayObjects={trayObjects}
      hidden={false}
      onHideTray={handleHideTray}
      onTrayObjectSelect={handleTrayObjectSelect}
      onTrayObjectMove={handleTrayObjectMove}
      isRunning={false}
    />);
    expect(screen.getByTestId("tray")).toBeInTheDocument();
    expect(screen.getByTestId("tray-close")).toBeInTheDocument();

    expect(screen.getAllByTestId("step-button")).toHaveLength(4);
    expect(screen.queryByTestId("step-check")).toBeNull();
  });
});
