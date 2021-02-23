import { ChemistryTestResult } from "./utils/chem-types";
import { EnvironmentType } from "./utils/environment";
import { HabitatFeatureType } from "./utils/habitat-utils";
import {
  AlgaeEatersAmountType, AnimalInstance, FishAmountType,
  LeafDecompositionType, LeafEatersAmountType, TrayObject
} from "./utils/sim-utils";

export interface ILeafModelConfig {}
export interface ILeafModelInputState {
  environment: EnvironmentType;
  sunnyDayFequency: number;
}
export interface ILeafModelOutputState {
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
export interface ILeafModelTransientState {
  time: number;
}
export interface ISerializableTrayObject extends Omit<TrayObject, "image" | "selectionPath" | "width" | "height"> {}
export interface ISerializableLeafModelOutputState extends Omit<ILeafModelOutputState, "trayObjects" | "habitatFeatures">  {
  trayObjects: ISerializableTrayObject[];
  habitatFeatures: string[];
}
