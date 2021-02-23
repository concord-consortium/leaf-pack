import { IAppProps } from "../components/render-app";
import {
  ILeafModelConfig, ILeafModelInputState, ILeafModelOutputState, ILeafModelTransientState
} from "../leaf-model-types";
import { ChemTestType } from "../utils/chem-types";
import { EnvironmentType } from "../utils/environment";
import {
  AlgaeEatersAmountType, FishAmountType, LeafDecompositionType, LeafEatersAmountType
} from "../utils/sim-utils";
import useModelState, { ContainerId, hasOwnProperties, IModelCurrentState } from "./use-model-state";

export { ContainerId };

const isValidExternalState = (newState: IModelCurrentState<ILeafModelInputState, ILeafModelOutputState>) => {
  return hasOwnProperties(newState.inputState, ["environment", "sunnyDayFequency"]) &&
          hasOwnProperties(newState.outputState, ["leafDecomposition", "leafEaters", "algaeEaters", "fish", "animalInstances"]);
};

const defaultOutputState: ILeafModelOutputState = {
  leafDecomposition: LeafDecompositionType.little,
  leafEaters: LeafEatersAmountType.few,
  algaeEaters: AlgaeEatersAmountType.few,
  fish: FishAmountType.few,
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
  habitatFeatures: new Set()
};

interface IProps extends IAppProps<ILeafModelInputState, ILeafModelOutputState, ILeafModelConfig> {
}
export const useLeafModelState = (props: IProps) => {
  return useModelState<ILeafModelInputState, ILeafModelOutputState, ILeafModelTransientState>({
    initialInputState: { environment: EnvironmentType.environment1, sunnyDayFequency: 0 },
    initialOutputState: {
      A: defaultOutputState,
      B: defaultOutputState,
      C: defaultOutputState,
      D: { ...defaultOutputState, ...{ fish: FishAmountType.none } }
    },
    initialTransientState: {
      time: 0
    },
    finalTransientState: {
      time: 1
    },
    isValidExternalState,
    rewindOutputState: (initialOutputState: ILeafModelOutputState, outputState: ILeafModelOutputState) => {
      // preserve parts of output state that persist through rewind
      const { trayObjects, pti, habitatFeatures, chemistryTestResults } = outputState;
      return { ...initialOutputState, ...{ trayObjects, pti, habitatFeatures, chemistryTestResults } };
    },
    ...props
  });
};
