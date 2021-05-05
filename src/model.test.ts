import { ILeafModelInputState } from "./leaf-model-types";
import { Model, kMaxSteps } from "./model";
import { EnvironmentType } from "./utils/environment";
import { AnimalInstance, Animals, AnimalType, kLowSunAbundanceFactor } from "./utils/sim-utils";

const getAnimalCounts = (animalInstances: AnimalInstance[]) => {
  const animalCounts: {type: AnimalType, count: number}[] = Animals.map((animal) => {
    return {type: animal.type, count: 0};
  });
  animalInstances.forEach((animalInstance) => {
    if (animalInstance.spawned) {
      const index = animalCounts.findIndex((obj) => obj.type === animalInstance.type);
      animalCounts[index].count++;
    }
  });
  return animalCounts;
};

describe("model", () => {
  let inputState: ILeafModelInputState;
  let model: Model;

  beforeEach(() => {
    inputState = { environment: EnvironmentType.environment1, sunnyDayFequency: 0 };
    model = new Model(inputState);
  });

  it("should start with 0% complete", () => {
    const {percentComplete, isFinished} = model.getSimulationState();
    expect(percentComplete).toEqual(0);
    expect(isFinished).toEqual(false);
  });

  it("should report 50% complete when half done", () => {
    for (let i = 0; i < kMaxSteps / 2; i++) {
      model.step();
    }
    const {percentComplete, isFinished} = model.getSimulationState();
    expect(percentComplete).toEqual(0.5);
    expect(isFinished).toEqual(false);
  });

  it("should report 100% complete when done", () => {
    for (let i = 0; i < kMaxSteps; i++) {
      model.step();
    }
    const {percentComplete, isFinished} = model.getSimulationState();
    expect(percentComplete).toEqual(1);
    expect(isFinished).toEqual(true);
  });
});

describe("model animal counts", () => {
  let inputState: ILeafModelInputState;
  let model: Model;

  it("should contain correct animal instances for environment 1, sunny", () => {
    inputState = { environment: EnvironmentType.environment1, sunnyDayFequency: 1 };

    // run the sim to the end
    model = new Model(inputState);
    for (let i = 0; i < kMaxSteps; i++) {
      model.step();
    }

    // get the animal counts
    const animalCounts = getAnimalCounts(model.getSimulationState().animalInstances);

    animalCounts.forEach((obj) => {
      const animal = Animals.find((a) => a.type === obj.type);
      expect(animal).toBeDefined();
      const abundanceRange = animal?.abundance.environment1.sunny;
      expect(abundanceRange).toBeDefined();
      if (abundanceRange) expect(obj.count).toBeGreaterThanOrEqual(abundanceRange.min);
      if (abundanceRange) expect(obj.count).toBeLessThanOrEqual(abundanceRange.max);
    });
  });

  it("should contain correct animal instances for environment 2, sunny", () => {
    inputState = { environment: EnvironmentType.environment2, sunnyDayFequency: 1 };

    // run the sim to the end
    model = new Model(inputState);
    for (let i = 0; i < kMaxSteps; i++) {
      model.step();
    }

    // get the animal counts
    const animalCounts = getAnimalCounts(model.getSimulationState().animalInstances);

    animalCounts.forEach((obj) => {
      const animal = Animals.find((a) => a.type === obj.type);
      expect(animal).toBeDefined();
      const abundanceRange = animal?.abundance.environment2.sunny;
      expect(abundanceRange).toBeDefined();
      if (abundanceRange) expect(obj.count).toBeGreaterThanOrEqual(abundanceRange.min);
      if (abundanceRange) expect(obj.count).toBeLessThanOrEqual(abundanceRange.max);
    });
  });

  it("should contain correct animal instances for environment 3, sunny", () => {
    inputState = { environment: EnvironmentType.environment3, sunnyDayFequency: 1 };

    // run the sim to the end
    model = new Model(inputState);
    for (let i = 0; i < kMaxSteps; i++) {
      model.step();
    }

    // get the animal counts
    const animalCounts = getAnimalCounts(model.getSimulationState().animalInstances);

    animalCounts.forEach((obj) => {
      const animal = Animals.find((a) => a.type === obj.type);
      expect(animal).toBeDefined();
      const abundanceRange = animal?.abundance.environment3.sunny;
      expect(abundanceRange).toBeDefined();
      if (abundanceRange) expect(obj.count).toBeGreaterThanOrEqual(abundanceRange.min);
      if (abundanceRange) expect(obj.count).toBeLessThanOrEqual(abundanceRange.max);
    });
  });

  it("should contain correct animal instances for environment 4, sunny", () => {
    inputState = { environment: EnvironmentType.environment4, sunnyDayFequency: 1 };

    // run the sim to the end
    model = new Model(inputState);
    for (let i = 0; i < kMaxSteps; i++) {
      model.step();
    }

    // get the animal counts
    const animalCounts = getAnimalCounts(model.getSimulationState().animalInstances);

    animalCounts.forEach((obj) => {
      const animal = Animals.find((a) => a.type === obj.type);
      expect(animal).toBeDefined();
      const abundanceRange = animal?.abundance.environment4.sunny;
      expect(abundanceRange).toBeDefined();
      if (abundanceRange) expect(obj.count).toBeGreaterThanOrEqual(abundanceRange.min);
      if (abundanceRange) expect(obj.count).toBeLessThanOrEqual(abundanceRange.max);
    });
  });

  it("should contain correct animal instances for environment 1, shady", () => {
    inputState = { environment: EnvironmentType.environment1, sunnyDayFequency: 0 };

    // run the sim to the end
    model = new Model(inputState);
    for (let i = 0; i < kMaxSteps; i++) {
      model.step();
    }

    // get the animal counts
    const animalCounts = getAnimalCounts(model.getSimulationState().animalInstances);

    animalCounts.forEach((obj) => {
      const animal = Animals.find((a) => a.type === obj.type);
      expect(animal).toBeDefined();
      const abundanceRange = animal?.abundance.environment1.notSunny;
      expect(abundanceRange).toBeDefined();
      if (abundanceRange) expect(obj.count).toBeGreaterThanOrEqual(Math.floor(abundanceRange.min * kLowSunAbundanceFactor));
      if (abundanceRange) expect(obj.count).toBeLessThanOrEqual(Math.floor(abundanceRange.max * kLowSunAbundanceFactor));
    });
  });

  it("should contain correct animal instances for environment 2, shady", () => {
    inputState = { environment: EnvironmentType.environment2, sunnyDayFequency: 0 };

    // run the sim to the end
    model = new Model(inputState);
    for (let i = 0; i < kMaxSteps; i++) {
      model.step();
    }

    // get the animal counts
    const animalCounts = getAnimalCounts(model.getSimulationState().animalInstances);

    animalCounts.forEach((obj) => {
      const animal = Animals.find((a) => a.type === obj.type);
      expect(animal).toBeDefined();
      const abundanceRange = animal?.abundance.environment2.notSunny;
      expect(abundanceRange).toBeDefined();
      if (abundanceRange) expect(obj.count).toBeGreaterThanOrEqual(Math.floor(abundanceRange.min * kLowSunAbundanceFactor));
      if (abundanceRange) expect(obj.count).toBeLessThanOrEqual(Math.floor(abundanceRange.max * kLowSunAbundanceFactor));
    });
  });

  it("should contain correct animal instances for environment 3, shady", () => {
    inputState = { environment: EnvironmentType.environment3, sunnyDayFequency: 0 };

    // run the sim to the end
    model = new Model(inputState);
    for (let i = 0; i < kMaxSteps; i++) {
      model.step();
    }

    // get the animal counts
    const animalCounts = getAnimalCounts(model.getSimulationState().animalInstances);

    animalCounts.forEach((obj) => {
      const animal = Animals.find((a) => a.type === obj.type);
      expect(animal).toBeDefined();
      const abundanceRange = animal?.abundance.environment3.notSunny;
      expect(abundanceRange).toBeDefined();
      if (abundanceRange) expect(obj.count).toBeGreaterThanOrEqual(Math.floor(abundanceRange.min * kLowSunAbundanceFactor));
      if (abundanceRange) expect(obj.count).toBeLessThanOrEqual(Math.floor(abundanceRange.max * kLowSunAbundanceFactor));
    });
  });

  it("should contain correct animal instances for environment 4, shady", () => {
    inputState = { environment: EnvironmentType.environment4, sunnyDayFequency: 0 };

    // run the sim to the end
    model = new Model(inputState);
    for (let i = 0; i < kMaxSteps; i++) {
      model.step();
    }

    // get the animal counts
    const animalCounts = getAnimalCounts(model.getSimulationState().animalInstances);

    animalCounts.forEach((obj) => {
      const animal = Animals.find((a) => a.type === obj.type);
      expect(animal).toBeDefined();
      const abundanceRange = animal?.abundance.environment4.notSunny;
      expect(abundanceRange).toBeDefined();
      if (abundanceRange) expect(obj.count).toBeGreaterThanOrEqual(Math.floor(abundanceRange.min * kLowSunAbundanceFactor));
      if (abundanceRange) expect(obj.count).toBeLessThanOrEqual(Math.floor(abundanceRange.max * kLowSunAbundanceFactor));
    });
  });
});
