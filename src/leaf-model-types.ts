import { ChemistryTestResult, ChemistryValues } from "./utils/chem-types";
import { EnvironmentType } from "./utils/environment";
import { HabitatFeatureType } from "./utils/habitat-utils";
import {
  AlgaeEatersAmountType, AnimalInstance, FishAmountType,
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
  chemistryValues?: ChemistryValues;
  chemistryTestResults: ChemistryTestResult[];
}
export interface IModelTransientState {
  time: number;
}
export interface ISerializableTrayObject extends Omit<TrayObject, "image" | "dragImage"> {}
export interface ISerializableModelOutputState extends Omit<IModelOutputState, "trayObjects" | "habitatFeatures">  {
  trayObjects: ISerializableTrayObject[];
  habitatFeatures: string[];
}
