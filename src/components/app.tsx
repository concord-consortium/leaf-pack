import React, { useRef, useState } from "react";
import { IThumbnailChooserProps, ThumbnailChooser } from "../components/thumbnail/thumbnail-chooser/thumbnail-chooser";
import { IAppProps } from "./render-app";
import { useModelState, IModelCurrentState, hasOwnProperties } from "../hooks/use-model-state";
import { MainViewWrapper } from "./simulation/main-view-wrapper";
import { SimulationView } from "./simulation/simulation-view";
import { ControlPanel } from "./control-panel/control-panel";
import { Thumbnail } from "./thumbnail/thumbnail";
import { Notebook } from "./notebook/notebook";
import { Tray } from "./simulation/tray";
import { ModalDialog } from "./modal-dialog";
import Modal from "react-modal";
import { Model } from "../model";
import { LeafEatersAmountType, Environment, Environments, EnvironmentType, getSunnyDayLogLabel, AlgaeEatersAmountType,
         LeafDecompositionType, FishAmountType, LeafPackStates, TrayAnimal, kTotalHabitatFeatures, AnimalInstance, Animals,
         kMinTrayX, kMaxTrayX, kMinTrayY, kMaxTrayY, kMinLeaves, kMaxLeaves, LeafType, LeafImages, TrayType
       } from "../utils/sim-utils";
import t from "../utils/translation/translate";

import "./app.scss";

export interface IModelConfig {}
export interface IModelInputState {
  environment: EnvironmentType;
  sunnyDayFequency: number;
}
export interface IModelOutputState {
  leafDecomposition: LeafDecompositionType;
  leafEaters: LeafEatersAmountType;
  algaeEaters: AlgaeEatersAmountType;
  fish: FishAmountType;
  animalInstances: AnimalInstance[];
}
export interface IModelTransientState {
  time: number;
}

const kTargetStepsPerSecond = 60;
const targetFramePeriod = 1000 / kTargetStepsPerSecond;
let lastStepTime: number;
const kSavedBgColor = "#000000";
const kSelectedContainerBgColor = "#f5f5f5";

Modal.setAppElement("#app");

// TODO: some of these app props are likely not needed
export const App: React.FC<IAppProps<IModelInputState, IModelOutputState, IModelConfig>> = ({onStateChange, addExternalSetStateListener, removeExternalSetStateListener, logEvent}) => {
  const isValidExternalState = (newState: IModelCurrentState<IModelInputState, IModelOutputState>) => {
    return hasOwnProperties(newState.inputState, ["environment", "sunnyDayFequency"]) &&
           hasOwnProperties(newState.outputState, ["leafDecomposition", "leafEaters", "algaeEaters", "fish", "animalInstances"]);
  };
  const modelState = useModelState<IModelInputState, IModelOutputState, IModelTransientState>({
    initialInputState: { environment: EnvironmentType.environment1,
                         sunnyDayFequency: 0 },
    initialOutputState: { leafDecomposition: LeafDecompositionType.little,
                          leafEaters: LeafEatersAmountType.few,
                          algaeEaters: AlgaeEatersAmountType.few,
                          fish: FishAmountType.few,
                          animalInstances: [] },
    initialTransientState: {
      time: 0
    },
    onStateChange,
    addExternalSetStateListener,
    removeExternalSetStateListener,
    isValidExternalState,
    logEvent
  });
  const {inputState, setInputState,
    outputState, setOutputState,
    simulationState, pauseSimulation, rewindSimulation,
    selectedContainerId, setSelectedContainerId,
    saveToSelectedContainer, containers, clearContainer, isSaved,
    transientState, setTransientState,
    startSimulation, endSimulation, inputControlsDisabled
  } = modelState;
  const {environment, sunnyDayFequency} = inputState;
  const {leafDecomposition, fish} = outputState;
  const {time} = transientState;
  const {isRunning, isPaused, isFinished} = simulationState;
  const modelRef = useRef<Model>(new Model(inputState));

  const handleStartSim = () => {
    lastStepTime = window.performance.now();
    if (!isPaused) {
      modelRef.current = new Model(inputState);
    }

    const simulationStep = () => {
      // simple calculation to work out desired times we should step the model.
      // this could be made more complex by calculating the total number of steps we
      // expect to have reached so far.
      const now = window.performance.now();
      const dt = now - lastStepTime;
      lastStepTime = now;
      const steps = Math.max(1, Math.min(10, Math.round(dt / targetFramePeriod)));

      for (let i = 0; i < steps; i++) {
        modelRef.current.step();
      }
      const modelSimulationState = modelRef.current.getSimulationState();
      setTransientState({
        time: modelSimulationState.percentComplete,
      });
      setOutputState({
        leafDecomposition: modelSimulationState.leafDecomposition,
        leafEaters: modelSimulationState.leafEaters,
        algaeEaters: modelSimulationState.algaeEaters,
        fish: modelSimulationState.fish,
        animalInstances: modelSimulationState.animalInstances
      });

      if (modelSimulationState.isFinished) {
        endSimulation();

        // get instance counts for sorting tray
        const trayObjects: TrayAnimal[] = Animals.map((animal) => {
          return { type: animal.type,
                  count: 0,
                  rotation: Math.random() * 360,
                  x: Math.random() * (kMaxTrayX - kMinTrayX) + kMinTrayX, // TODO: needs to respect tray bounds
                  y: Math.random() * (kMaxTrayY - kMinTrayY) + kMinTrayY, // TODO: needs to respect tray bounds
                  collected: false };
        });
        modelSimulationState.animalInstances.forEach((animalInstance) => {
          if (animalInstance.spawned) {
            const index = trayObjects.findIndex((ac: TrayAnimal) => ac.type === animalInstance.type);
            trayObjects[index].count++;
          }
        });

        // add leaves
        // TODO: these should be interspersed throughout the tray, place on bottom for now
        // since they cannot be moved
        const numLeaves = Math.random() * (kMaxLeaves - kMinLeaves) + kMinLeaves;
        for (let l = 0; l < numLeaves; l++) {
          trayObjects.unshift(
            { type: LeafType.leaf,
              count: 0,
              rotation: Math.random() * 360,
              x: Math.random() * (kMaxTrayX - kMinTrayX) + kMinTrayX, // TODO: needs to respect tray bounds
              y: Math.random() * (kMaxTrayY - kMinTrayY) + kMinTrayY, // TODO: needs to respect tray bounds
              collected: false,
              image: LeafImages[Math.floor(Math.random() * LeafImages.length)]
            });
        }

        setTrayAnimals(trayObjects);

        setShowTray(true);

      }
    };

    startSimulation(simulationStep);
  };

  const thumbnailChooserProps: IThumbnailChooserProps<IModelInputState, IModelOutputState> = {
    Thumbnail,
    containers,
    clearContainer,
    selectedContainerId,
    setSelectedContainerId,
    savedBgColor: kSavedBgColor,
    selectedContainerBgColor: kSelectedContainerBgColor
  };

  const weeks = Math.floor(3 * time);
  const timeLabel = weeks !== 1 ? "LABEL.TIME_WEEKS" : "LABEL.TIME_WEEK";

  const handleChangeSunnyDays = (event: any, value: number) => {
    // the material ui slider calls this repeatedly with the same value during a mouse drag so only log a change in value
    if (value !== sunnyDayFequency) {
      logEvent("changeSunnyDay", {data: {value, label: getSunnyDayLogLabel(value)}});
    }
    setInputState({sunnyDayFequency: value});
  };

  const handleChangeEnvironment = (value: EnvironmentType) => {
    if (value !== environment) {
      logEvent("changEnvironment", {data: {value}});
    }
    setInputState({environment: value});
  };

  const currentEnvironment = Environments.find((env: Environment) => env.type === environment);
  const backgroundImage = currentEnvironment?.backgroundImage;
  const leafPackState = LeafPackStates.find((ls) => ls.leafDecomposition === leafDecomposition) || LeafPackStates[0];

  const [trayAnimals, setTrayAnimals] = useState<TrayAnimal[]>([]);
  const [showTray, setShowTray] = useState(false);
  const handleRewind = () => {
    setShowTray(false);
    setTrayAnimals([]);
    rewindSimulation();
  };

  const [traySelectionType, setTraySelectionType] = useState<TrayType | undefined>(undefined);
  const handleTrayObjectSelect = (objectType: TrayType) => {
    if (objectType !== LeafType.leaf) {
      setTraySelectionType(objectType);
    }
  };
  const handleCategorizeAnimal = (trayType: TrayType | undefined, notebookType: TrayType | undefined) => {
    if (trayType === notebookType && trayType !== undefined) {
      const updatedTrayAnimals = trayAnimals.map(ta => {
        if (ta.type === trayType) {
          const collectedTrayAnimal = { ...ta };
          collectedTrayAnimal.collected = true;
          return collectedTrayAnimal;
        } else {
          return ta;
        }
      });
      setTrayAnimals(updatedTrayAnimals);
    } else {
      setShowModal(true);
    }
    setTraySelectionType(undefined);
  };

  const [habitatSelectedFeatures, setHabitatSelectedFeatures] = useState(Array(kTotalHabitatFeatures).fill(false));
  const handleHabitatSelectFeature = (index: number, value: boolean) => {
    const newSelectedFeatures = habitatSelectedFeatures.map((featureSelection, i) => i === index ? value : featureSelection);
    setHabitatSelectedFeatures(newSelectedFeatures);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app" data-testid="app">
      <div className="content">
        <ThumbnailChooser {...thumbnailChooserProps} />
        <div className="simulation" data-testid="simulation">
          <MainViewWrapper
            title={selectedContainerId}
            isSaved={isSaved}
            isFinished={isFinished}
            onSaveClicked={saveToSelectedContainer}
            currentTimeLabel={t(timeLabel, {vars: {weeks: `${weeks}`}})}
            currentTime={time}
            maxTime={1}
            savedBgColor={kSavedBgColor}
          >
            <SimulationView
              backgroundImage={backgroundImage}
              environment={environment}
              leafPackState={leafPackState}
              fish={fish}
              onShowTray={() => setShowTray(true)}
              isFinished={isFinished}
              isRunning={isRunning}
            />
            <Tray
              trayAnimals={trayAnimals}
              onHideTray={() => setShowTray(false)}
              onTrayObjectSelect={handleTrayObjectSelect}
              traySelectionType={traySelectionType}
              hidden={!showTray}
              isRunning={isRunning}
            />
          </MainViewWrapper>
          <Notebook
            trayAnimals={trayAnimals}
            environment={environment}
            featureSelections={habitatSelectedFeatures}
            onSelectFeature={handleHabitatSelectFeature}
            onCategorizeAnimal={handleCategorizeAnimal}
            traySelectionType={traySelectionType}
            isRunning={isRunning}
          />
        </div>
        <ControlPanel
          isRunning={isRunning}
          isPaused={isPaused}
          isFinished={isFinished}
          inputControlsDisabled={inputControlsDisabled}
          onStartSim={handleStartSim}
          onPauseSim={pauseSimulation}
          onRewindSim={handleRewind}
          onChangeSunnyDaySlider={handleChangeSunnyDays}
          sunnyDayFequency={sunnyDayFequency}
          environment={environment}
          onChangeEnvironment={handleChangeEnvironment}
        />
      </div>
      <ModalDialog
        title={t("MACRO.ERROR.TITLE")}
        label={t("MACRO.ERROR.DESCRIPTION")}
        onClose={() => setShowModal(false)}
        showModal={showModal}
      />
    </div>
  );
};
