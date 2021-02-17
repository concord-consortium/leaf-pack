import React, { useRef, useState } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
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
import { LeafEatersAmountType, EnvironmentType, getSunnyDayLogLabel, AlgaeEatersAmountType,
         LeafDecompositionType, FishAmountType, LeafPackStates, TrayObject, AnimalInstance, Animals, kTraySpawnPadding,
         kMinTrayX, kMaxTrayX, kMinTrayY, kMaxTrayY, kMinLeaves, kMaxLeaves, TrayType, Leaves, draggableAnimalTypes
       } from "../utils/sim-utils";
import { HabitatFeatureType } from "../utils/habitat-utils";
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

        setTrayObjects(newTrayObjects);
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

  const leafPackState = LeafPackStates.find((ls) => ls.leafDecomposition === leafDecomposition) || LeafPackStates[0];

  const [trayObjects, setTrayObjects] = useState<TrayObject[]>([]);
  const [showTray, setShowTray] = useState(false);

  const handleRewind = () => {
    setShowTray(false);
    setTrayObjects([]);
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
      setTrayObjects(updatedTrayObjects);
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
    setTrayObjects(updatedTrayObjects);
  };

  const [habitatSelectedFeatures, setHabitatSelectedFeatures] = useState<Record<HabitatFeatureType, boolean>>(
    { [HabitatFeatureType.pools]: false, [HabitatFeatureType.riffles]: false, [HabitatFeatureType.runs]: false,
      [HabitatFeatureType.manyTrees]: false, [HabitatFeatureType.someTrees]: false, [HabitatFeatureType.noTrees]: false,
      [HabitatFeatureType.grassOnly]: false, [HabitatFeatureType.pavement]: false, [HabitatFeatureType.leaves]: false,
      [HabitatFeatureType.cobbles]: false, [HabitatFeatureType.woodyDebris]: false, [HabitatFeatureType.plantRoots]: false,
      [HabitatFeatureType.lightCover]: false, [HabitatFeatureType.thickCover]: false, [HabitatFeatureType.thickCoverClumps]: false,
      [HabitatFeatureType.fish]: false, [HabitatFeatureType.beavers]: false, [HabitatFeatureType.trash]: false,
      [HabitatFeatureType.pipes]: false
    }
  );
  const handleHabitatSelectFeature = (feature: HabitatFeatureType, value: boolean) => {
    const newSelectedFeatures = { ...habitatSelectedFeatures };
    newSelectedFeatures[feature] = value;
    setHabitatSelectedFeatures(newSelectedFeatures);
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
              currentTimeLabel={t(timeLabel, {vars: {weeks: `${weeks}`}})}
              currentTime={time}
              maxTime={1}
              savedBgColor={kSavedBgColor}
            >
              <SimulationView
                environment={environment}
                leafPackState={leafPackState}
                fish={fish}
                onShowTray={() => setShowTray(true)}
                isFinished={isFinished}
                isRunning={isRunning}
              />
              <Tray
                trayObjects={trayObjects}
                onHideTray={() => setShowTray(false)}
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
              featureSelections={habitatSelectedFeatures}
              onSelectFeature={handleHabitatSelectFeature}
              onCategorizeAnimal={handleCategorizeAnimal}
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
