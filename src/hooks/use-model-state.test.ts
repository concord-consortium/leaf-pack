import { waitFor } from "@testing-library/react";
import { renderHook, act } from "@testing-library/react-hooks";
import { ExternalSetStateListenerCallback, LogEventMethod } from "../components/render-app";
import { ContainerId, ContainerIds, initContainerMap, initialSimulationState, useModelState } from "./use-model-state";

interface IModelInputState {
  foo: boolean;
  bar: string;
}

interface IModelOutputState {
  bam: number;
}

interface IModelTransientState {
  baz: number;
}

const initialInputState = (): IModelInputState => ({
  foo: true,
  bar: "boom"
});

const initialOutputState = (): IModelOutputState => ({
  bam: 10
});

const initialTransientState: IModelTransientState = {
  baz: 0
};

const finalTransientState: IModelTransientState = {
  baz: 1000
};

describe("useModelState", () => {
  let HookWrapper: (props: unknown) => any;
  let onStateChange: () => any;
  let addExternalSetStateListener: () => any;
  let removeExternalSetStateListener: () => any;
  let isValidExternalState: () => any;
  let logEvent: LogEventMethod;
  let mockSimulationStep: () => void;

  beforeEach(() => {
    onStateChange = jest.fn();
    addExternalSetStateListener = jest.fn();
    removeExternalSetStateListener = jest.fn();
    isValidExternalState = jest.fn();
    logEvent = jest.fn();
    mockSimulationStep = jest.fn();

    HookWrapper = () => useModelState<IModelInputState, IModelOutputState, IModelTransientState>({
      initialContainerId: "A",
      initialInputState,
      initialOutputState,
      initialTransientState,
      finalTransientState,
      onStateChange,
      addExternalSetStateListener,
      removeExternalSetStateListener,
      isValidExternalState,
      logEvent
    });

    // cf. https://stackoverflow.com/a/66271345
    jest.useFakeTimers();
    let count = 0;
    jest.spyOn(window, "requestAnimationFrame")
        .mockImplementation((cb: any) => window.setTimeout(() => cb(100*(++count)), 100));
  });

  afterEach(() => {
    (window.requestAnimationFrame as any).mockRestore();
    jest.useRealTimers();
  });

  it("returns correct values", () => {
    const { result } = renderHook(HookWrapper);
    const {
      inputState,
      outputState,
      transientState,
      simulationState,
      selectedContainerId,
      containers,
      isDirty,
      isSaved,
      isSimulationRunning,
    } = result.current;
    expect(inputState).toEqual(initialInputState());
    expect(outputState).toEqual(initialOutputState());
    expect(transientState).toEqual(initialTransientState);
    expect(simulationState).toEqual(initialSimulationState);
    expect(selectedContainerId).toEqual("A");
    expect(isDirty).toEqual(false);
    expect(isSaved).toEqual(false);
    expect(isSimulationRunning.current).toEqual(false);
    expect(containers).toEqual(initContainerMap());
  });

  it("implements the setters", () => {
    const { result } = renderHook(HookWrapper);

    expect(result.current.isDirty).toEqual(false);
    act(() => {
      result.current.setInputState({foo: false});
    });
    expect(result.current.inputState).toEqual({...initialInputState(), foo: false});
    expect(result.current.isDirty).toEqual(true);

    act(() => {
      result.current.setOutputState({bam: 100});
    });
    expect(result.current.outputState).toEqual({...initialOutputState(), bam: 100});

    act(() => {
      result.current.setTransientState({baz: 10000});
    });
    expect(result.current.transientState).toEqual({...initialTransientState, baz: 10000});

    act(() => {
      result.current.setSelectedContainerId("B");
    });
    expect(result.current.selectedContainerId).toEqual("B");
  });

  it("implements the simulation methods", async () => {
    const { result } = renderHook(HookWrapper);

    act(() => {
      result.current.startSimulation(mockSimulationStep);
    });
    expect(result.current.isSimulationRunning.current).toEqual(true);
    await waitFor(() => expect(mockSimulationStep).toHaveBeenCalledTimes(1));
    expect(result.current.simulationState).toEqual({
      isFinished: false,
      isPaused: false,
      isRunning: true
    });
    expect(logEvent).toHaveBeenCalledWith("startSimulation", {"includeState": true});

    act(() => {
      // trigger call to simulationRunner()
      result.current.startSimulation(mockSimulationStep);
    });
    expect(result.current.isSimulationRunning.current).toEqual(true);
    expect(logEvent).toHaveBeenCalledWith("startSimulation", {"includeState": true});

    act(() => {
      result.current.pauseSimulation();
    });
    expect(result.current.isSimulationRunning.current).toEqual(false);
    expect(result.current.simulationState).toEqual({
      isFinished: false,
      isPaused: true,
      isRunning: true
    });
    expect(logEvent).toHaveBeenCalledWith("pauseSimulation", {"includeState": true});

    act(() => {
      result.current.startSimulation(mockSimulationStep);
      result.current.pauseSimulation();
    });
    expect(result.current.isSimulationRunning.current).toEqual(false);
    expect(logEvent).toHaveBeenCalledWith("pauseSimulation", {"includeState": true});

    act(() => {
      result.current.rewindSimulation();
    });
    expect(result.current.isSimulationRunning.current).toEqual(false);
    expect(result.current.simulationState).toEqual({
      isFinished: false,
      isPaused: false,
      isRunning: false
    });
    expect(logEvent).toHaveBeenCalledWith("rewindSimulation", {"includeState": true});

    act(() => {
      result.current.startSimulation(mockSimulationStep);
      result.current.endSimulation();
    });
    expect(result.current.isSimulationRunning.current).toEqual(false);
    expect(result.current.simulationState).toEqual({
      isFinished: true,
      isPaused: false,
      isRunning: false
    });
    expect(logEvent).toHaveBeenCalledWith("endSimulation", {includeState: true});

    act(() => {
      result.current.startSimulation(() => undefined);
      result.current.endSimulation({ keepAnimating: true });
    });
    expect(result.current.isSimulationRunning.current).toEqual(true);
    expect(result.current.simulationState).toEqual({
      isFinished: true,
      isPaused: false,
      isRunning: false
    });
    expect(logEvent).toHaveBeenCalledWith("endSimulation", {includeState: true});
  });

  it("supports rewindOutputState option", () => {
    const mockRewind = jest.fn();

    HookWrapper = () => useModelState<IModelInputState, IModelOutputState, IModelTransientState>({
      initialContainerId: "A",
      initialInputState,
      initialOutputState,
      initialTransientState,
      finalTransientState,
      onStateChange,
      rewindOutputState: mockRewind,
      addExternalSetStateListener,
      removeExternalSetStateListener,
      isValidExternalState,
      logEvent
    });

    const { result } = renderHook(HookWrapper);
    act(() => {
      result.current.startSimulation(mockSimulationStep);
      result.current.endSimulation();
      result.current.rewindSimulation();
    });
    expect(mockRewind).toHaveBeenCalledTimes(1);
  });

  it("implements container saving and clearing", () => {
    const { result } = renderHook(HookWrapper);

    expect(result.current.isDirty).toEqual(false);
    expect(result.current.isSaved).toEqual(false);
    act(() => {
      result.current.setInputState({foo: false, bar: "updated"});
    });
    expect(result.current.isDirty).toEqual(true);
    expect(result.current.isSaved).toEqual(false);

    expect(result.current.containers).toEqual(initContainerMap());
    act(() => {
      result.current.saveToSelectedContainer();
    });
    expect(result.current.containers).toEqual(initContainerMap({
      A: {inputState: {foo: false, bar: "updated"}, outputState: initialOutputState(), simulationState: initialSimulationState, isSaved: true}}));
    expect(result.current.isDirty).toEqual(false);
    expect(result.current.isSaved).toEqual(true);
    expect(logEvent).toHaveBeenCalledWith("save", {"data": {"containerId": "A", "inputState": {"bar": "updated", "foo": false}, "outputState": {"bam": 10}}, "includeState": true});

    act(() => {
      result.current.clearContainer("A");
    });
    expect(result.current.isDirty).toEqual(false);
    expect(result.current.isSaved).toEqual(false);
    expect(result.current.containers).toEqual(initContainerMap());
    expect(logEvent).toHaveBeenCalledWith("clear", {"data": {"containerId": "A"}, "includeState": true});
    expect(logEvent).toHaveBeenCalledWith("rewindSimulation", {"includeState": true});
  });

  it("selects new container once the current one has been cleared (deleted)", () => {
    const { result } = renderHook(HookWrapper);
    const saveContainer = (key: ContainerId) => {
      act(() => {
        result.current.setSelectedContainerId(key);
      });
      act(() => {
        result.current.setInputState({cont: key});
      });
      act(() => {
        result.current.saveToSelectedContainer();
      });
      expect(result.current.selectedContainerId).toEqual(key);
    };

    for (const id of ContainerIds) {
      saveContainer(id);
    }

    // Now, select and delete container C.
    act(() => {
      result.current.setSelectedContainerId("C");
    });
    act(() => {
      result.current.clearContainer("C");
    });
    // Container B should be automatically selected, as it's the last, non-empty container before C.
    expect(result.current.selectedContainerId).toEqual("B");

    // Delete container B.
    act(() => {
      result.current.clearContainer("B");
    });
    // Container A should be automatically selected, as it's the last, non-empty container before B.
    expect(result.current.selectedContainerId).toEqual("A");

    // Delete container A.
    act(() => {
      result.current.clearContainer("A");
    });
    // Container D should be automatically selected, as it's the first, non-empty container after A.
    expect(result.current.selectedContainerId).toEqual("D");

    // Delete container D.
    act(() => {
      result.current.clearContainer("D");
    });
    // Container E should be automatically selected, as it's the first, non-empty container after D.
    // expect(result.current.selectedContainerId).toEqual("E");

    // Delete container E.
    // act(() => {
    //   result.current.clearContainer("E");
    // });
    // Container A should be automatically selected, as there's nothing else left and A is default one.
    expect(result.current.selectedContainerId).toEqual("A");

    // Delete container A.
    act(() => {
      result.current.clearContainer("A");
    });
    // Container A should be automatically selected, as there's nothing else left and A is default one.
    expect(result.current.selectedContainerId).toEqual("A");
  });

  it("implements state change notification and external state change listening", () => {
    const { unmount } = renderHook(HookWrapper);

    expect(onStateChange).toHaveBeenCalled();
    expect(addExternalSetStateListener).toHaveBeenCalled();

    expect(removeExternalSetStateListener).not.toHaveBeenCalled();
    unmount();
    expect(removeExternalSetStateListener).toHaveBeenCalled();
  });

  it("implements external state updates", () => {
    const listeners: ExternalSetStateListenerCallback<IModelInputState, IModelOutputState>[] = [];
    const testAddExternalSetStateListener = (listener: ExternalSetStateListenerCallback<IModelInputState, IModelOutputState>) => {
      listeners.push(listener);
    };
    const isValidExternalStateRetTrue = jest.fn(() => true);

    HookWrapper = () => useModelState<IModelInputState, IModelOutputState, IModelTransientState>({
      initialContainerId: "A",
      initialInputState,
      initialOutputState,
      initialTransientState,
      finalTransientState,
      onStateChange,
      addExternalSetStateListener: testAddExternalSetStateListener,
      removeExternalSetStateListener,
      isValidExternalState: isValidExternalStateRetTrue,
      logEvent
    });
    const { result } = renderHook(HookWrapper);
    expect(result.current.isDirty).toEqual(false);
    expect(result.current.isSaved).toEqual(false);

    expect(listeners.length).toEqual(1);
    expect(isValidExternalStateRetTrue).not.toHaveBeenCalled();

    act(() => {
      listeners.forEach(listener => listener({
        inputState: {foo: false, bar: "test"},
        outputState: {bam: 20},
        selectedContainerId: "B",
        containers: initContainerMap({A: {isSaved: true} as any})
      }));
    });
    expect(isValidExternalStateRetTrue).toHaveBeenCalled();
    expect(result.current.isDirty).toEqual(false);
    expect(result.current.isSaved).toEqual(false); // B container is not saved yet

    act(() => {
      listeners.forEach(listener => listener({
        inputState: {foo: false, bar: "test"},
        outputState: {bam: 20},
        selectedContainerId: "B",
        containers: initContainerMap({B: {isSaved: true} as any})
      }));
    });
    expect(isValidExternalStateRetTrue).toHaveBeenCalled();
    expect(result.current.isDirty).toEqual(false);
    expect(result.current.isSaved).toEqual(true); // B container has been saved
  });

  it("handles invalid external state updates", () => {
    const listeners: ExternalSetStateListenerCallback<IModelInputState, IModelOutputState>[] = [];
    const testAddExternalSetStateListener = (listener: ExternalSetStateListenerCallback<IModelInputState, IModelOutputState>) => {
      listeners.push(listener);
    };
    const isValidExternalStateRetFalse = jest.fn(() => false);

    HookWrapper = () => useModelState<IModelInputState, IModelOutputState, IModelTransientState>({
      initialContainerId: "A",
      initialInputState,
      initialOutputState,
      initialTransientState,
      finalTransientState,
      onStateChange,
      addExternalSetStateListener: testAddExternalSetStateListener,
      removeExternalSetStateListener,
      isValidExternalState: isValidExternalStateRetFalse,
      logEvent
    });
    const { result } = renderHook(HookWrapper);
    expect(result.current.isDirty).toEqual(false);
    expect(result.current.isSaved).toEqual(false);

    expect(listeners.length).toEqual(1);
    expect(isValidExternalStateRetFalse).not.toHaveBeenCalled();

    act(() => {
      listeners.forEach(listener => listener({
        inputState: {foo: false, bar: "test"},
        outputState: {bam: 20},
        selectedContainerId: "B",
        containers: initContainerMap({A: {isSaved: true} as any})
      }));
    });
    expect(isValidExternalStateRetFalse).toHaveBeenCalled();
    expect(result.current.isDirty).toEqual(false);
    expect(result.current.isSaved).toEqual(false); // B container is not saved yet

    act(() => {
      listeners.forEach(listener => listener({
        inputState: {foo: false, bar: "test"},
        outputState: {bam: 20},
        selectedContainerId: "B",
        containers: initContainerMap({B: {isSaved: true} as any})
      }));
    });
    expect(isValidExternalStateRetFalse).toHaveBeenCalled();
    expect(result.current.isDirty).toEqual(false);
    expect(result.current.isSaved).toEqual(false);
  });
});
