import { calculateRotatedBoundingBox, calculateBoundedPosition, getRandomInteger, shuffleArray } from "./math-utils";

describe("Math utility functions", () => {
  it("determines if rotated bounding box is calculated", () => {
    const rotation1 = calculateRotatedBoundingBox(100, 100, 45);
    const rotation2 = calculateRotatedBoundingBox(100, 100, 90);
    const rotation3 = calculateRotatedBoundingBox(100, 200, 45);
    const rotation4 = calculateRotatedBoundingBox(100, 200, 90);
    expect(rotation1.height).toBeCloseTo(141.4, 1);
    expect(rotation1.width).toBeCloseTo(141.4, 1);
    expect(rotation2.height).toBeCloseTo(100.0, 1);
    expect(rotation2.width).toBeCloseTo(100.0, 1);
    expect(rotation3.height).toBeCloseTo(212.1, 1);
    expect(rotation3.width).toBeCloseTo(212.1, 1);
    expect(rotation4.height).toBeCloseTo(100.0, 1);
    expect(rotation4.width).toBeCloseTo(200.0, 1);
  });
  it("determines if bounded position is calculated", () => {
    // no change
    const pos1 = calculateBoundedPosition(50, 50, 100, 100, 500, 0, 500, 0);
    expect(pos1.left).toBe(50);
    expect(pos1.top).toBe(50);
    // too far to left
    const pos2 = calculateBoundedPosition(-100, 50, 100, 100, 500, 0, 500, 0);
    expect(pos2.left).toBe(-50);
    expect(pos2.top).toBe(50);
    // too far to right
    const pos3 = calculateBoundedPosition(500, 50, 100, 100, 500, 0, 500, 0);
    expect(pos3.left).toBe(450);
    expect(pos3.top).toBe(50);
    // too high
    const pos4 = calculateBoundedPosition(100, -100, 100, 100, 500, 0, 500, 0);
    expect(pos4.left).toBe(100);
    expect(pos4.top).toBe(-50);
    // too low
    const pos5 = calculateBoundedPosition(100, 500, 100, 100, 500, 0, 500, 0);
    expect(pos5.left).toBe(100);
    expect(pos5.top).toBe(450);
  });
  it("determines if random number is generated", () => {
    const num1 = getRandomInteger(0, 10);
    const num2 = getRandomInteger(100, 200);
    const num3 = getRandomInteger(20, 50);
    expect(num1).toBeGreaterThanOrEqual(0);
    expect(num1).toBeLessThanOrEqual(10);
    expect(num2).toBeGreaterThanOrEqual(100);
    expect(num2).toBeLessThanOrEqual(200);
    expect(num3).toBeGreaterThanOrEqual(20);
    expect(num3).toBeLessThanOrEqual(50);
  });
  it("determines if shuffled array is generated", () => {
    const array1 = [0, 1, 2, 3, 4, 5];
    const arrayShuffled = shuffleArray(array1);
    expect(arrayShuffled.length).toBe(6);
    expect(arrayShuffled.includes(0)).toBe(true);
    expect(arrayShuffled.includes(1)).toBe(true);
    expect(arrayShuffled.includes(2)).toBe(true);
    expect(arrayShuffled.includes(3)).toBe(true);
    expect(arrayShuffled.includes(4)).toBe(true);
    expect(arrayShuffled.includes(5)).toBe(true);
  });
});
