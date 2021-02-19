import React, { useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import Modal from "react-modal";
import { IThumbnailChooserProps, ThumbnailChooser } from "../components/thumbnail/thumbnail-chooser/thumbnail-chooser";
import { IAppProps } from "./render-app";
import { useModelState, IModelCurrentState, hasOwnProperties, ContainerId } from "../hooks/use-model-state";
import { MainViewWrapper } from "./simulation/main-view-wrapper";
import { SimulationView } from "./simulation/simulation-view";
import { ControlPanel } from "./control-panel/control-panel";
import { Thumbnail } from "./thumbnail/thumbnail";
import { Notebook } from "./notebook/notebook";
import { Tray } from "./simulation/tray";
import { ModalDialog } from "./modal-dialog";
import { Model } from "../model";
import { LeafEatersAmountType, EnvironmentType, getSunnyDayLogLabel, AlgaeEatersAmountType,
         LeafDecompositionType, FishAmountType, LeafPackStates, TrayObject, AnimalInstance, Animals, kTraySpawnPadding,
         kMinTrayX, kMaxTrayX, kMinTrayY, kMaxTrayY, kMinLeaves, kMaxLeaves, TrayType, Leaves, draggableAnimalTypes,
         containerIdForEnvironmentMap, environmentForContainerId
       } from "../utils/sim-utils";
import { HabitatFeatureType } from "../utils/habitat-utils";
import { getPTIScore } from "../utils/macro-utils";
import { ChemistryTestResult, ChemTestType, chemistryTests } from "../utils/chem-utils";
import { calculateRotatedBoundingBox, calculateBoundedPosition, getRandomInteger, shuffleArray } from "../utils/math-utils";
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
  showTray: boolean;
  trayObjects: TrayObject[];
  pti?: number;
  habitatFeatures: Set<HabitatFeatureType>;
  chemistryTestResults: ChemistryTestResult[];
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
                          animalInstances: [],
                          showTray: false,
                          trayObjects: [],
                          chemistryTestResults: [
                            {type: ChemTestType.airTemperature, stepsComplete: 0, value: 0},
                            {type: ChemTestType.waterTemperature, stepsComplete: 0, value: 0},
                            {type: ChemTestType.pH, stepsComplete: 0, value: 0},
                            {type: ChemTestType.nitrate, stepsComplete: 0, value: 0},
                            {type: ChemTestType.turbidity, stepsComplete: 0, value: 0},
                            {type: ChemTestType.dissolvedOxygen, stepsComplete: 0, value: 0}
                          ],
                          habitatFeatures: new Set()
                        },
    initialTransientState: {
      time: 0
    },
    finalTransientState: {
      time: 1
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
  const {fish, habitatFeatures, leafDecomposition, showTray, trayObjects, chemistryTestResults} = outputState;
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

        const numLeaves = getRandomInteger(kMinLeaves, kMaxLeaves);
        const numAnimals = Animals.length;
        const shuffledZIndices = shuffleArray(Array.from(Array(numLeaves + numAnimals).keys()));

        // add animals to the tray
        const newTrayObjects: TrayObject[] = Animals.map((animal, index) => {
          const rotation = Math.random() * 360;
          const boundingBox = calculateRotatedBoundingBox(animal.width, animal.height, rotation);
          return { type: animal.type,
                   trayIndex: index,
                   image: animal.image,
                   dragImage: animal.dragImage,
                   count: 0,
                   rotation,
                   left: getRandomInteger(kMaxTrayX - animal.width - kTraySpawnPadding, kMinTrayX + kTraySpawnPadding),
                   top: getRandomInteger(kMaxTrayY - animal.height - kTraySpawnPadding, kMinTrayY + kTraySpawnPadding),
                   width: animal.width,
                   height: animal.height,
                   boundingBoxWidth: boundingBox.width,
                   boundingBoxHeight: boundingBox.height,
                   collected: false,
                   selectionPath: animal.selectionPath,
                   zIndex: shuffledZIndices[index] };
        });
        modelSimulationState.animalInstances.forEach((animalInstance) => {
          if (animalInstance.spawned) {
            const index = newTrayObjects.findIndex((obj: TrayObject) => obj.type === animalInstance.type);
            newTrayObjects[index].count++;
          }
        });

        // add leaves to the tray
        const trayIndexOffset = newTrayObjects.length;
        for (let l = 0; l < numLeaves; l++) {
          // TODO: this will need to be based on leafpack deterioration
          const leafIndex = getRandomInteger(0, Leaves.length - 1);
          const leaf = Leaves[leafIndex];
          const rotation = Math.random() * 360;
          const boundingBox = calculateRotatedBoundingBox(leaf.width, leaf.height, rotation);
          newTrayObjects.push(
            { type: leaf.type,
              trayIndex: trayIndexOffset + l,
              image: leaf.image,
              dragImage: leaf.dragImage,
              count: 1,
              rotation,
              left: getRandomInteger(kMaxTrayX - leaf.width - kTraySpawnPadding, kMinTrayX + kTraySpawnPadding),
              top: getRandomInteger(kMaxTrayY - leaf.height - kTraySpawnPadding, kMinTrayY + kTraySpawnPadding),
              width: leaf.width,
              height: leaf.height,
              boundingBoxWidth: boundingBox.width,
              boundingBoxHeight: boundingBox.height,
              collected: false,
              selectionPath: leaf.selectionPath,
              zIndex: shuffledZIndices[numAnimals + l]
            }
          );
        }

        setOutputStateAndSave({ trayObjects: newTrayObjects, showTray: true });
      }
    };

    startSimulation(simulationStep);
  };

  const _setSelectedContainerId = (containerId: ContainerId) => {
    setSelectedContainerId(containerId);
    setInputState({environment: environmentForContainerId[containerId]});
  };

  const thumbnailChooserProps: IThumbnailChooserProps<IModelInputState, IModelOutputState> = {
    Thumbnail,
    disableUnselectedThumbnails: isRunning,
    containers,
    clearContainer,
    selectedContainerId,
    setSelectedContainerId: _setSelectedContainerId,
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
    setSelectedContainerId(containerIdForEnvironmentMap[value]);
    setInputState({environment: value});
  };

  const leafPackState = LeafPackStates.find((ls) => ls.leafDecomposition === leafDecomposition) || LeafPackStates[0];

  const setOutputStateAndSave = (output: Partial<IModelOutputState>) => {
    const pti = output.trayObjects ? { pti: getPTIScore(output.trayObjects) }: undefined;
    setOutputState({ ...output, ...pti });
  };

  const handleRewind = () => {
    setOutputStateAndSave({ trayObjects: [], showTray: false });
    setTraySelectionType(undefined);
    rewindSimulation();
  };

  const [traySelectionType, setTraySelectionType] = useState<TrayType | undefined>(undefined);
  const handleTrayObjectSelect = (objectType: TrayType) => {
    if (draggableAnimalTypes.find((obj) => obj === objectType)) {
      setTraySelectionType(objectType);
    }
  };
  const handleCategorizeAnimal = (trayType: TrayType | undefined, notebookType: TrayType | undefined) => {
    if (trayType === notebookType && trayType !== undefined) {
      const updatedTrayObjects = trayObjects.map(obj => {
        if (obj.type === trayType) {
          const collectedTrayAnimal = { ...obj };
          collectedTrayAnimal.collected = true;
          return collectedTrayAnimal;
        } else {
          return obj;
        }
      });
      setOutputStateAndSave({ trayObjects: updatedTrayObjects });
    } else {
      setShowModal(true);
    }
    setTraySelectionType(undefined);
  };

  const handleMoveTrayObject = (trayIndex: number, left: number, top: number) => {
    const currZIndex = trayObjects.find((obj) => obj.trayIndex === trayIndex)?.zIndex;
    const updatedTrayObjects = trayObjects.map((obj) => {
      if (obj.trayIndex === trayIndex) {
        const movedTrayObject = { ...obj };
        const newPos = calculateBoundedPosition(left, top, movedTrayObject.width, movedTrayObject.height,
          kMaxTrayX, kMinTrayX, kMaxTrayY, kMinTrayY);
        movedTrayObject.left = newPos.left;
        movedTrayObject.top = newPos.top;
        movedTrayObject.zIndex = trayObjects.length - 1;
        return movedTrayObject;
      } else if (currZIndex && obj.zIndex > currZIndex) {
        const restackedTrayObject = { ...obj };
        restackedTrayObject.zIndex = restackedTrayObject.zIndex - 1;
        return restackedTrayObject;
      } else {
        return obj;
      }
    });
    setOutputStateAndSave({ trayObjects: updatedTrayObjects });
    setTraySelectionType(undefined);
  };

  const handleHabitatSelectFeature = (feature: HabitatFeatureType, value: boolean) => {
    if (value) habitatFeatures.add(feature);
    else habitatFeatures.delete(feature);
    setOutputStateAndSave({ habitatFeatures });
  };

  const handleUpdateTestResult = (type: ChemTestType, completedStep: number) => {
    const updatedChemistryTestResults = chemistryTestResults.map((result: ChemistryTestResult) => {
      if (result.type === type) {
        const updatedResult = { ...result };
        updatedResult.stepsComplete = completedStep;
        const currentTest = chemistryTests.find((test) => test.type === type);
        if (completedStep === currentTest?.steps.length) {
          // TODO: user defines value, pick random number for now
          updatedResult.value = currentTest.values[getRandomInteger(0, currentTest.values.length - 1)].value;
        }
        return updatedResult;
      } else {
        return result;
      }
    });
    setOutputStateAndSave({ chemistryTestResults: updatedChemistryTestResults });
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="app" data-testid="app">
      <div className="content">
        <ThumbnailChooser {...thumbnailChooserProps} />
        <DndProvider backend={TouchBackend} options={{enableMouseEvents: true}} >
          <div className="simulation" data-testid="simulation">
            <MainViewWrapper
              title={selectedContainerId}
              isSaved={isSaved}
              isFinished={isFinished}
              onSaveClicked={saveToSelectedContainer}
              ptiScore={outputState.pti}
              currentTimeLabel={t(timeLabel, {vars: {weeks: `${weeks}`}})}
              currentTime={time}
              maxTime={1}
              savedBgColor={kSavedBgColor}
            >
              <SimulationView
                environment={environment}
                leafPackState={leafPackState}
                fish={fish}
                onShowTray={() => setOutputStateAndSave({ showTray: true })}
                isFinished={isFinished}
                isRunning={isRunning}
              />
              <Tray
                trayObjects={trayObjects}
                onHideTray={() => setOutputStateAndSave({ showTray: false })}
                onTrayObjectSelect={handleTrayObjectSelect}
                traySelectionType={traySelectionType}
                hidden={!showTray}
                onTrayObjectMove={handleMoveTrayObject}
                isRunning={isRunning}
              />
            </MainViewWrapper>
            <Notebook
              trayObjects={trayObjects}
              environment={environment}
              featureSelections={habitatFeatures}
              onSelectFeature={handleHabitatSelectFeature}
              onCategorizeAnimal={handleCategorizeAnimal}
              chemistryTestResults={chemistryTestResults}
              onUpdateTestResult={handleUpdateTestResult}
              traySelectionType={traySelectionType}
              isRunning={isRunning}
            />
          </div>
        </DndProvider>
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
