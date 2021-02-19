import { ChemistryTestResult } from "./utils/chem-utils";
import { HabitatFeatureType } from "./utils/habitat-utils";
import {
  AlgaeEatersAmountType, AnimalInstance, EnvironmentType, FishAmountType,
  LeafDecompositionType, LeafEatersAmountType, TrayObject
} from "./utils/sim-utils";

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
