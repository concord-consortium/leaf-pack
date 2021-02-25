import { useRef } from "react";
import { IAppProps } from "../components/render-app";
import {
  ILeafModelConfig, ILeafModelInputState, ILeafModelOutputState, ILeafModelTransientState
} from "../leaf-model-types";
import { Model } from "../model";
import { ChemTestType } from "../utils/chem-types";
import { environmentForContainerId } from "../utils/environment";
import { HabitatFeatureType } from "../utils/habitat-utils";
import {
  AlgaeEatersAmountType, FishAmountType, LeafDecompositionType, LeafEatersAmountType
} from "../utils/sim-utils";
import useModelState, { ContainerId, hasOwnProperties, IModelCurrentState } from "./use-model-state";

export { ContainerId };

export const isValidExternalState = (newState: IModelCurrentState<ILeafModelInputState, ILeafModelOutputState>) => {
  return hasOwnProperties(newState.inputState, ["environment", "sunnyDayFequency"]) &&
          hasOwnProperties(newState.outputState, ["leafDecomposition", "leafEaters", "algaeEaters", "fish", "animalInstances"]);
};

export const initialInputState = (containerId: ContainerId): ILeafModelInputState => ({
  environment: environmentForContainerId[containerId],
  sunnyDayFequency: 0
});

export const initialOutputState = (containerId: ContainerId): ILeafModelOutputState => ({
  leafDecomposition: LeafDecompositionType.little,
  leafEaters: LeafEatersAmountType.few,
  algaeEaters: AlgaeEatersAmountType.few,
  fish: containerId === "D" ? FishAmountType.none : FishAmountType.few,
  animalInstances: [],
  showTray: false,
  trayObjects: [],
  chemistryTestResults: [
    {type: ChemTestType.airTemperature, stepsComplete: 0},
    {type: ChemTestType.waterTemperature, stepsComplete: 0},
    {type: ChemTestType.pH, stepsComplete: 0},
    {type: ChemTestType.nitrate, stepsComplete: 0},
    {type: ChemTestType.turbidity, stepsComplete: 0},
    {type: ChemTestType.dissolvedOxygen, stepsComplete: 0}
  ],
  habitatFeatures: new Set<HabitatFeatureType>()
});

interface IProps extends IAppProps<ILeafModelInputState, ILeafModelOutputState, ILeafModelConfig> {
}
export const useLeafModelState = (props: IProps) => {

  const modelsRef = useRef<Record<ContainerId, Model>>({
          A: new Model(initialInputState("A")),
          B: new Model(initialInputState("B")),
          C: new Model(initialInputState("C")),
          D: new Model(initialInputState("D"))
        });

  const modelState =
    useModelState<ILeafModelInputState, ILeafModelOutputState, ILeafModelTransientState>({
      initialContainerId: "A",
      initialInputState,
      initialOutputState,
      initialTransientState: {
        time: 0
      },
      finalTransientState: {
        time: 1
      },
      isValidExternalState,
      rewindOutputState: (containerId: ContainerId, outputState: ILeafModelOutputState) => {
        // preserve parts of output state that persist through rewind
        const { trayObjects, pti, habitatFeatures, chemistryTestResults } = outputState;
        return { ...initialOutputState(containerId), ...{ trayObjects, pti, habitatFeatures, chemistryTestResults } };
      },
      // since we auto-save, save shouldn't be logged as a user action
      suppressedLogEvents: ["save"],
      ...props
    });

  return {
    model: modelsRef.current[modelState.selectedContainerId],
    resetModel: () => {
      modelsRef.current[modelState.selectedContainerId] = new Model(initialInputState(modelState.selectedContainerId));
    },
    ...modelState
  };
};
