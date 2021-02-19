import React from "react";
import { render, screen } from "@testing-library/react";
import { TrayImagePreview } from "./tray-image-preview";
import { AnimalType, TrayObject } from "../../utils/sim-utils";

let callCount = 0;
jest.mock("react-dnd-preview", () => ({
  // display is false on first call, true after that
  usePreview: () => ({ display: callCount++ > 0, item: {} })
}));

describe("TrayImagePreview component", () => {

  const trayWrapper: any = {
    getBoundingClientRect() {
      return { x: 0, y: 0, width: 100, height: 100 };
    }
  };

  const trayObject: TrayObject = {
    type: AnimalType.caddisFly,
    trayIndex: 0,
    count: 1,
    collected: false,
    left: 100,
    top: 100,
    width: 50,
    height: 50,
    boundingBoxWidth: 60,
    boundingBoxHeight: 60,
    rotation: 0,
    image: null,
    dragImage: null,
    selectionPath: "",
    zIndex: 1
  };

  it("doesn't render with no display", () => {
    render(<TrayImagePreview trayWrapper={null} trayObject={trayObject}
              dragSourcePosition={null} dragPosition={null} />);
    expect(screen.queryByTestId("preview")).toBeNull();
  });

  it("doesn't render with no drag position", () => {
    render(<TrayImagePreview trayWrapper={null} trayObject={trayObject}
              dragSourcePosition={null} dragPosition={null} />);
    expect(screen.queryByTestId("preview")).toBeNull();
  });

  it("renders with no tray", () => {
    render(<TrayImagePreview trayWrapper={null} trayObject={trayObject}
              dragSourcePosition={{ x: 10, y: 10 }} dragPosition={{ x: 20, y: 20 }} />);
    expect(screen.getByTestId("preview")).toBeInTheDocument();
  });

  it("renders when over tray", () => {
    render(<TrayImagePreview trayWrapper={trayWrapper} trayObject={trayObject}
              dragSourcePosition={{ x: 10, y: 10 }} dragPosition={{ x: 20, y: 20 }} />);
    expect(screen.getByTestId("preview")).toBeInTheDocument();
  });

  it("renders when not over tray", () => {
    render(<TrayImagePreview trayWrapper={trayWrapper} trayObject={trayObject}
              dragSourcePosition={{ x: 1000, y: 1000 }} dragPosition={{ x: 2000, y: 2000 }} />);
    expect(screen.getByTestId("preview")).toBeInTheDocument();
  });
});
