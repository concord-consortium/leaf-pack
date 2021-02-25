import { act, renderHook } from "@testing-library/react-hooks";
import { ILeafModelInputState, ILeafModelOutputState } from "../leaf-model-types";
import { HabitatFeatureType } from "../utils/habitat-utils";
import { FishAmountType } from "../utils/sim-utils";
import { isValidExternalState, useLeafModelState } from "./use-leaf-model-state";
import { IModelCurrentState } from "./use-model-state";

describe("useLeafModelState", () => {

  const onStateChange = jest.fn();
  const addExternalSetStateListener = jest.fn();
  const removeExternalSetStateListener = jest.fn();
  const logEvent = jest.fn();

  test("works as expected", () => {
    const { result, rerender } = renderHook(() =>
      useLeafModelState({
        onStateChange,
        addExternalSetStateListener,
        removeExternalSetStateListener,
        logEvent,
        modelConfig: {}
      }));
    expect(result.current.selectedContainerId).toBe("A");
    expect(result.current.outputState.fish).toBe(FishAmountType.few);
    expect(result.current.outputState.habitatFeatures.has(HabitatFeatureType.pools)).toBe(false);
    expect(result.current.model.getSimulationState().percentComplete).toBe(0);

    act(() => {
      result.current.model.step();
      rerender();
    });
    expect(result.current.model.getSimulationState().percentComplete).toBeGreaterThan(0);
    act(() => {
      result.current.resetModel();
      rerender();
    });
    expect(result.current.model.getSimulationState().percentComplete).toBe(0);
    act(() => {
      result.current.model.step();
      rerender();
    });
    expect(result.current.model.getSimulationState().percentComplete).toBeGreaterThan(0);

    const validCurrentState: IModelCurrentState<ILeafModelInputState, ILeafModelOutputState> = {
      inputState: result.current.inputState,
      outputState: result.current.outputState,
      containers: result.current.containers,
      selectedContainerId: result.current.selectedContainerId
    };
    expect(isValidExternalState(validCurrentState)).toBe(true);

    act(() => {
      result.current.setOutputState({ habitatFeatures: new Set([HabitatFeatureType.pools]) });
    });
    expect(result.current.outputState.habitatFeatures.has(HabitatFeatureType.pools)).toBe(true);

    act(() => {
      result.current.rewindSimulation();
      rerender();
    });
    // habitat features are preserved through rewind
    expect(result.current.outputState.habitatFeatures.has(HabitatFeatureType.pools)).toBe(true);

    act(() => {
      result.current.setSelectedContainerId("D");
      rerender();
    });
    // habitat features are not preserved across containers
    expect(result.current.outputState.habitatFeatures.has(HabitatFeatureType.pools)).toBe(false);
    // initial fish value is reset when switching containers
    expect(result.current.outputState.fish).toBe(FishAmountType.none);
    // "D" model shouldn't be started, i.e. it's independent of the "A" model
    expect(result.current.model.getSimulationState().percentComplete).toBe(0);

    act(() => {
      result.current.setSelectedContainerId("A");
      rerender();
    });
    // habitat features of "A" preserved
    expect(result.current.outputState.habitatFeatures.has(HabitatFeatureType.pools)).toBe(true);
    // initial fish value is reset when switching containers
    expect(result.current.outputState.fish).toBe(FishAmountType.few);
    // "A" model has been started
    expect(result.current.model.getSimulationState().percentComplete).toBeGreaterThan(0);
  });

});
