import { IModelInputState, IModelOutputState } from "../leaf-model-types";
import { EnvironmentType } from "./environment";
import { AlgaeEatersAmountType, AnimalType, FishAmountType, LeafDecompositionType, LeafEatersAmountType } from "./sim-utils";
import { aquaticWormSelectionPath } from "./selection-utils";
import aquaticWormImage from "../assets/animals/aquaticworm.svg";
import aquaticWormDragImage from "../assets/animals/drag-previews/aquaticworm.png";
import { HabitatFeatureType } from "./habitat-utils";
import { ChemTestType } from "./chem-types";
import { deserialize, SerializableModelState, serialize } from "./serialize-utils";
import { IModelCurrentState } from "../hooks/use-model-state";

type ModelState = IModelCurrentState<IModelInputState, IModelOutputState>;

const inputState: IModelInputState = { environment: EnvironmentType.environment1, sunnyDayFequency: 0 };
const outputState: IModelOutputState = {
  leafDecomposition: LeafDecompositionType.little,
  leafEaters: LeafEatersAmountType.few,
  algaeEaters: AlgaeEatersAmountType.few,
  fish: FishAmountType.few,
  animalInstances: [
    {
      type: AnimalType.aquaticWorm,
      spawnTime: 0,
      spawned: true
    }
  ],
  showTray: true,
  trayObjects: [
    {
      type: AnimalType.aquaticWorm,
      trayIndex: 0,
      count: 1,
      collected: true,
      left: 1,
      top: 1,
      width: 1,
      height: 1,
      boundingBoxWidth: 1,
      boundingBoxHeight: 1,
      rotation: 1,
      image: aquaticWormImage,
      dragImage: aquaticWormDragImage,
      selectionPath: aquaticWormSelectionPath,
      zIndex: 1
    }
  ],
  habitatFeatures: new Set([HabitatFeatureType.beavers, HabitatFeatureType.cobbles]),
  chemistryTestResults: [
    {
      type: ChemTestType.airTemperature,
      currentStep: 1,
      stepsComplete: 1,
      value: 1
    }
  ]
};

const modelState: ModelState = {
  inputState,
  outputState,
  containers: {
    A: null,
    B: {
      inputState,
      outputState,
      simulationState: {
        isRunning: false,
        isPaused: false,
        isFinished: true
      },
      isSaved: true
    },
    C: null,
    D: null
  },
  selectedContainerId: "B"
};


describe("serializing and deserializing", () => {

  let serializedState: SerializableModelState;
  let deserializedState: ModelState;

  beforeEach(() => {
    serializedState = serialize(modelState);

    // ensure serialization can survive round-trip through JSON
    const serializedStateJSON = JSON.stringify(serializedState);
    const parsedDeserializedState = JSON.parse(serializedStateJSON);

    deserializedState = deserialize(parsedDeserializedState);
  });

  it("should serialize and deserialize to the same state", () => {
    // recursively compares properties, including Sets etc.
    expect(deserializedState).toEqual(modelState);
  });

});
