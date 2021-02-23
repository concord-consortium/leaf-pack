import { useEffect, useRef, useState } from "react";
import { ExternalSetStateListenerCallback, LogEventMethod } from "../components/render-app";
import { IModelOutputState as ILeafModelOutputState } from "../leaf-model-types";
import { useStateWithCallbackLazy } from "./use-state-with-callback";

// cf. https://stackoverflow.com/a/45486495
export const ContainerIds = ["A", "B", "C", "D"] as const;
export type ContainerId = typeof ContainerIds[number];

export interface ISimulationState {
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
}

export const initialSimulationState: ISimulationState = {
  isRunning: false,
  isPaused: false,
  isFinished: false,
};

export interface IContainer<IModelInputState, IModelOutputState> {
  inputState: IModelInputState;
  outputState: IModelOutputState;
  simulationState: ISimulationState;
  isSaved: boolean;
}

export type IContainerMap<IModelInputState, IModelOutputState> = Record<ContainerId, IContainer<IModelInputState, IModelOutputState> | null>;
export type IPartialContainerMap<IModelInputState, IModelOutputState> = Partial<IContainerMap<IModelInputState, IModelOutputState>>;

export const initContainerMap = <IModelInputState, IModelOutputState>(
  input?: IPartialContainerMap<IModelInputState, IModelOutputState>
): IContainerMap<IModelInputState, IModelOutputState> => {
  const result: IPartialContainerMap<IModelInputState, IModelOutputState> = {};
  for (const id of ContainerIds) result[id] = null;
  return { ...result, ...input } as IContainerMap<IModelInputState, IModelOutputState>;
};

export interface IModelCurrentState<IModelInputState, IModelOutputState> {
  inputState: IModelInputState;
  outputState: IModelOutputState;
  containers: IContainerMap<IModelInputState, IModelOutputState>;
  selectedContainerId: ContainerId;
}

export type ModelStateChangeCallback<IModelInputState, IModelOutputState> = (currentState: IModelCurrentState<IModelInputState, IModelOutputState>) => void;

export interface IUseModelStateOptions<IModelInputState, IModelOutputState, IModelTransientState> {
  initialInputState: IModelInputState;
  initialOutputState: Record<ContainerId, IModelOutputState>;
  initialTransientState: IModelTransientState;
  finalTransientState: IModelTransientState;
  onStateChange: ModelStateChangeCallback<IModelInputState, IModelOutputState>;
  addExternalSetStateListener: (listener: ExternalSetStateListenerCallback<IModelInputState, IModelOutputState>) => void;
  removeExternalSetStateListener: (listener: ExternalSetStateListenerCallback<IModelInputState, IModelOutputState>) => void;
  isValidExternalState: (newState: IModelCurrentState<IModelInputState, IModelOutputState>) => boolean;
  logEvent: LogEventMethod;
}

export const hasOwnProperties = (obj: Record<string, any>, properties: string[]) => properties.reduce<boolean>((acc, prop) => acc && Object.prototype.hasOwnProperty.call(obj, prop), true);

export const useModelState = <IModelInputState, IModelOutputState, IModelTransientState>(options: IUseModelStateOptions<IModelInputState, IModelOutputState, IModelTransientState>) => {
  type ContainerMap = IContainerMap<IModelInputState, IModelOutputState>;

  const {initialInputState, initialOutputState, initialTransientState, finalTransientState,
        onStateChange, addExternalSetStateListener, removeExternalSetStateListener, isValidExternalState, logEvent} = options;
  const [inputState, _setInputState] = useState<IModelInputState>(initialInputState);
  const [outputState, _setOutputState] = useStateWithCallbackLazy<IModelOutputState>(initialOutputState.A);
  const [transientState, _setTransientState] = useState<IModelTransientState>(initialTransientState);
  const [simulationState, _setSimulationState] = useState<ISimulationState>(initialSimulationState);
  const [selectedContainerId, _setSelectedContainerId] = useState<ContainerId>("A");
  const [containers, _setContainers] = useState<ContainerMap>(initContainerMap());
  const [isDirty, _setIsDirty] = useState(false);
  const [isSaved, _setIsSaved] = useState(false);

  // need to use reference so that its value is not captured in simulation
  const isSimulationRunning = useRef(false);

  // listen for state changes from the PCI
  useEffect(() => {
    const listener: ExternalSetStateListenerCallback<IModelInputState, IModelOutputState> = (newState) => {
      // ignore invalid external states
      if (hasOwnProperties(newState, ["inputState", "outputState", "containers", "selectedContainerId"]) && isValidExternalState(newState)) {
        _setInputState(newState.inputState);
        _setOutputState(newState.outputState);
        _setContainers(newState.containers);
        _setSelectedContainerId(newState.selectedContainerId);
        _setTransientState(initialTransientState);
        _setSimulationState(initialSimulationState);
        _setIsDirty(false);
        const selectedContainer = newState.containers?.[newState.selectedContainerId];
        _setIsSaved(!!selectedContainer?.isSaved);
      }
    };
    addExternalSetStateListener(listener);
    return () => removeExternalSetStateListener(listener);
  }, [addExternalSetStateListener, removeExternalSetStateListener, isValidExternalState, initialTransientState, _setOutputState]);

  // notify PCI about any state changes
  useEffect(() => {
    onStateChange({inputState, outputState, containers, selectedContainerId});
  }, [onStateChange, inputState, outputState, containers, selectedContainerId]);

  const setInputState = (update: Partial<IModelInputState>) => {
    _setInputState(oldInputState => {
      const newState = {...oldInputState, ...update};
      _setIsDirty(JSON.stringify(newState) !== JSON.stringify(containers[selectedContainerId]));
      return newState;
    });
  };

  const setOutputState = (update: Partial<IModelOutputState>) => {
    _setOutputState(oldOutputState => ({...oldOutputState, ...update}),
                    newOutputState => saveToSelectedContainer(newOutputState));
  };

  const setTransientState = (update: Partial<IModelTransientState>) => {
    _setTransientState(oldTransientState => ({...oldTransientState, ...update}));
  };

  const setSelectedContainerId = (containerId: ContainerId) => {
    logEvent("select", {data: {containerId}, includeState: true});
    if (containerId !== selectedContainerId) {
      _setContainers(currentContainers => {
        pauseSimulation();

        const container = currentContainers[containerId];
        _setSelectedContainerId(containerId);
        _setInputState(container?.inputState || initialInputState);

        _setOutputState(container?.outputState || initialOutputState[containerId]);
        _setSimulationState(initialSimulationState);
        _setTransientState(container?.outputState ? finalTransientState : initialTransientState);

        _setIsDirty(false);
        _setIsSaved(!!container?.isSaved);

        // return the same value - the setter was used just to get the current value
        return currentContainers;
      });
    }
  };

  const clearContainer = (containerId: ContainerId) => {
    logEvent("clear", {data: {containerId}, includeState: true});
    _setContainers(oldContainers => ({...oldContainers, [containerId]: null}));

    let lastNonEmptyBefore: ContainerId | null = null;
    let firstNonEmptyAfter: ContainerId | null = null;
    ContainerIds.forEach(key => {
      if (containers[key]) {
        if ((key as string) < (containerId as string)) {
          lastNonEmptyBefore = key;
        }
        if (!firstNonEmptyAfter && (key as string) > (containerId as string)) {
          firstNonEmptyAfter = key;
        }
      }
    });
    const containerToSelect: ContainerId | null = lastNonEmptyBefore || firstNonEmptyAfter;
    if (containerToSelect) {
      setSelectedContainerId(containerToSelect);
    } else {
      setSelectedContainerId("A");
      // Lines below handle case when user is deleting state "A" even before saving it. It's pretty much a model reset.
      _setInputState(initialInputState);
      _setIsDirty(false);
      _setIsSaved(false);
      rewindSimulation();
    }
  };

  const saveToSelectedContainer = (output?: IModelOutputState) => {
    _setContainers(oldContainers => {
      // `output` argument can be more current than closure's `outputState`
      const _outputState = output ?? outputState;
      logEvent("save", {data: {containerId: selectedContainerId, inputState, outputState: _outputState}, includeState: true});
      const newContainer: IContainer<IModelInputState, IModelOutputState> = {
        inputState, outputState: _outputState, simulationState, isSaved: true
      };
      return {...oldContainers, [selectedContainerId]: newContainer};
    });
    _setIsDirty(false);
    _setIsSaved(true);
  };

  const startSimulation = (simulationStep: () => void) => {
    logEvent("startSimulation", {includeState: true});
    if (!simulationState.isPaused) {
      _setTransientState(initialTransientState);
    }
    _setSimulationState({isRunning: true, isPaused: false, isFinished: false});

    const simulationRunner = () => {
      if (isSimulationRunning.current) {
        simulationStep();
        window.requestAnimationFrame(simulationRunner);
      }
    };

    isSimulationRunning.current = true;
    window.requestAnimationFrame(simulationRunner);
  };

  const pauseSimulation = () => {
    logEvent("pauseSimulation", {includeState: true});
    _setSimulationState(oldSimulationState => ({...oldSimulationState, ...{isPaused: true}}));
    isSimulationRunning.current = false;
  };

  const rewindSimulation = () => {
    logEvent("rewindSimulation", {includeState: true});
    // TODO: shouldn't need to cast here
    const _outputState: ILeafModelOutputState = outputState as any;
    // preserve parts of output state that persist through rewind
    const { trayObjects, pti, habitatFeatures, chemistryTestResults } = _outputState;
    _setOutputState({ ...initialOutputState[selectedContainerId],
                      ...{ trayObjects, pti, habitatFeatures, chemistryTestResults } });
    _setTransientState(initialTransientState);
    _setSimulationState({isRunning: false, isPaused: false, isFinished: false});
    isSimulationRunning.current = false;
  };

  // if `keepAnimating` is true, the model will set all states as being finished, but will continue
  // to call the `step` function. This can be used to keep animations going that do not affect the
  // actual output state.
  const endSimulation = (opts?: {keepAnimating?: boolean}) => {
    if (!opts?.keepAnimating){
      // all the PCIs that use `keepAnimating` so far (evaporator-bottle and plant-restoration) call endSimulation
      // for a few seconds before calling one final time with keepAnimating: false, at which point we will log the
      // event. If we break this pattern (e.g. keep calling "keepAnimating: true" indefinitely) we should update this
      // to log a single time the first time it is called.
      logEvent("endSimulation", {includeState: true});
      // stop the requestAnimationFrame loop
      isSimulationRunning.current = false;
    }
    _setSimulationState({isRunning: false, isPaused: false, isFinished: true});
  };

  // Provide helper value so it doesn't have to calculated in all the apps separately.
  const inputControlsDisabled = simulationState.isRunning || simulationState.isFinished;

  return {
    inputState, setInputState,
    outputState, setOutputState,
    transientState, setTransientState,
    simulationState, // no setter, that is handled in start/pause/rewindSimulation
    selectedContainerId, setSelectedContainerId,
    containers, saveToSelectedContainer,
    clearContainer,
    isDirty,
    isSaved,
    inputControlsDisabled,
    isSimulationRunning,
    startSimulation, pauseSimulation, rewindSimulation, endSimulation
  };
};

export default useModelState;
