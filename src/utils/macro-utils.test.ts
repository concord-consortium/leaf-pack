import { getPTIScore } from "./macro-utils";
import { AnimalType, TrayObject } from "./sim-utils";

describe("Macro utility functions", () => {
  it("determines if PTI score is computed", () => {
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
    const trayObjectsEmpty: TrayObject[] = [];
    const excellentScore = getPTIScore(trayObjectsExcellent);
    const goodScore = getPTIScore(trayObjectsGood);
    const fairScore = getPTIScore(trayObjectsFair);
    const poorScore = getPTIScore(trayObjectsPoor);
    const emptyScore = getPTIScore(trayObjectsEmpty);
    expect(excellentScore).toBe(24);
    expect(goodScore).toBe(21);
    expect(fairScore).toBe(11);
    expect(poorScore).toBe(7);
    expect(emptyScore).toBe(0);
  });
});
