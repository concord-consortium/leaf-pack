import { IAppProps } from "../components/render-app";
import { IModelConfig, IModelInputState, IModelOutputState, IModelTransientState } from "../leaf-model-types";
import { ChemTestType } from "../utils/chem-types";
import { EnvironmentType } from "../utils/environment";
import { AlgaeEatersAmountType, FishAmountType, LeafDecompositionType, LeafEatersAmountType } from "../utils/sim-utils";
import useModelState, { ContainerId, hasOwnProperties, IModelCurrentState } from "./use-model-state";

export { ContainerId };

const isValidExternalState = (newState: IModelCurrentState<IModelInputState, IModelOutputState>) => {
  return hasOwnProperties(newState.inputState, ["environment", "sunnyDayFequency"]) &&
          hasOwnProperties(newState.outputState, ["leafDecomposition", "leafEaters", "algaeEaters", "fish", "animalInstances"]);
};

interface IProps extends IAppProps<IModelInputState, IModelOutputState, IModelConfig> {
}
export const useLeafModelState = (props: IProps) => {
  return useModelState<IModelInputState, IModelOutputState, IModelTransientState>({
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
    isValidExternalState,
    ...props
  });
};
