import { IModelInputState } from "./leaf-model-types";
import { Model, kMaxSteps } from "./model";
import { EnvironmentType } from "./utils/environment";

describe("model", () => {
  let inputState: IModelInputState;
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
