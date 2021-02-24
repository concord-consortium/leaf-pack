import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { IThumbnailChooserProps, ThumbnailChooser } from "../components/thumbnail/thumbnail-chooser/thumbnail-chooser";
import { IAppProps } from "./render-app";
import { MainViewWrapper } from "./simulation/main-view-wrapper";
import { SimulationView } from "./simulation/simulation-view";
import { ControlPanel } from "./control-panel/control-panel";
import { Thumbnail } from "./thumbnail/thumbnail";
import { Notebook } from "./notebook/notebook";
import { Tray } from "./simulation/tray";
import { useCurrent } from "../hooks/use-current";
import { ContainerId, useLeafModelState } from "../hooks/use-leaf-model-state";
import { ILeafModelConfig, ILeafModelInputState, ILeafModelOutputState } from "../leaf-model-types";
import { ChemistryTestResult, IUpdateChemistryTestResult } from "../utils/chem-types";
import { chemistryTests, chemistryFinalValues } from "../utils/chem-utils";
import { containerIdForEnvironmentMap, environmentForContainerId, EnvironmentType } from "../utils/environment";
import {
  Animals, AnimalType, draggableAnimalTypes, getSunnyDayLogLabel, kMinLeaves, kMaxLeaves, kMinTrayX, kMaxTrayX,
  kMinTrayY, kMaxTrayY, kTraySpawnPadding, LeafPackStates, Leaves, TrayObject, TrayType
} from "../utils/sim-utils";
import { HabitatFeatureType } from "../utils/habitat-utils";
import { getPTIScore } from "../utils/macro-utils";
import {
  calculateRotatedBoundingBox, calculateBoundedPosition, getRandomInteger, shuffleArray
} from "../utils/math-utils";
import t from "../utils/translation/translate";

import "./app.scss";

const kTargetStepsPerSecond = 60;
const targetFramePeriod = 1000 / kTargetStepsPerSecond;
let lastStepTime: number;
const kSavedBgColor = "#000000";
const kSelectedContainerBgColor = "#f5f5f5";

// TODO: some of these app props are likely not needed
export const App: React.FC<IAppProps<ILeafModelInputState, ILeafModelOutputState, ILeafModelConfig>> = (appProps) => {
  const { logEvent } = appProps;
  const {model, resetModel,
    inputState, setInputState,
    outputState, setOutputState,
    simulationState, pauseSimulation, rewindSimulation,
    selectedContainerId, setSelectedContainerId,
    saveToSelectedContainer, containers, clearContainer, isSaved,
    transientState, setTransientState,
    startSimulation, endSimulation, inputControlsDisabled
  } = useLeafModelState(appProps);
  const modelRef = useCurrent(model);
  const {environment, sunnyDayFequency} = inputState;
  const {fish, habitatFeatures, leafDecomposition, showTray, trayObjects, chemistryTestResults} = outputState;
  const {time} = transientState;
  const {isRunning, isPaused, isFinished} = simulationState;

  const handleStartSim = () => {
    lastStepTime = window.performance.now();
    if (!isPaused) {
      resetModel();
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
      const { percentComplete, isFinished: _isFinished, ...modelOutputState } = modelRef.current.getSimulationState();
      setTransientState({ time: percentComplete });
      setOutputState(modelOutputState);

      if (_isFinished) {
        endSimulation();

        const numLeaves = getRandomInteger(kMinLeaves, kMaxLeaves);
        const numAnimals = Animals.length;
        const shuffledZIndices = shuffleArray(Array.from(Array(numLeaves + numAnimals).keys()));

        // preserve collection status for each organism
        const collectedAnimals = new Set<AnimalType>();
        outputState.trayObjects.forEach(animal => {
          animal.collected && collectedAnimals.add(animal.type as AnimalType);
        });

        // add animals to the tray
        const newTrayObjects: TrayObject[] = Animals.map((animal, index) => {
          const rotation = Math.random() * 360;
          const boundingBox = calculateRotatedBoundingBox(animal.width, animal.height, rotation);
          return { type: animal.type,
                   trayIndex: index,
                   image: animal.image,
                   count: 0,
                   rotation,
                   left: getRandomInteger(kMaxTrayX - animal.width - kTraySpawnPadding, kMinTrayX + kTraySpawnPadding),
                   top: getRandomInteger(kMaxTrayY - animal.height - kTraySpawnPadding, kMinTrayY + kTraySpawnPadding),
                   width: animal.width,
                   height: animal.height,
                   boundingBoxWidth: boundingBox.width,
                   boundingBoxHeight: boundingBox.height,
                   collected: collectedAnimals.has(animal.type),
                   selectionPath: animal.selectionPath,
                   zIndex: shuffledZIndices[index] };
        });
        modelOutputState.animalInstances.forEach((animalInstance) => {
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

  const thumbnailChooserProps: IThumbnailChooserProps<ILeafModelInputState, ILeafModelOutputState> = {
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

  const setOutputStateAndSave = (output: Partial<ILeafModelOutputState>) => {
    const pti = output.trayObjects ? { pti: getPTIScore(output.trayObjects) }: undefined;
    setOutputState({ ...output, ...pti });
  };

  const handleRewind = () => {
    resetModel();
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

  const handleUpdateTestResult = ({type, currentStep, stepsComplete, value}: IUpdateChemistryTestResult) => {
    const updatedChemistryTestResults = chemistryTestResults.map((result: ChemistryTestResult) => {
      if (result.type === type) {
        const updatedResult = { ...result };
        if (stepsComplete != null) {
          updatedResult.currentStep = stepsComplete - 1;
          updatedResult.stepsComplete = stepsComplete;
        }
        else if (currentStep != null) {
          updatedResult.currentStep = currentStep;
          updatedResult.stepsComplete = currentStep;
        }
        const currentTest = chemistryTests.find((test) => test.type === type);
        if (updatedResult.stepsComplete === currentTest?.steps.length && value !== undefined) {
          updatedResult.value = value;
        }
        return updatedResult;
      } else {
        return result;
      }
    });
    setOutputStateAndSave({ chemistryTestResults: updatedChemistryTestResults });
  };

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
              chemistryValues={chemistryFinalValues[environment]}
              chemistryTestResults={chemistryTestResults}
              onUpdateTestResult={handleUpdateTestResult}
              traySelectionType={traySelectionType}
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
    </div>
  );
};
