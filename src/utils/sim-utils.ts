import { EnvironmentType } from "./environment";
import t from "./translation/translate";

import LeafPackImage1 from "../assets/leafpack1.png";
import LeafPackImage2 from "../assets/leafpack2.png";
import LeafPackImage3 from "../assets/leafpack3.png";
import stoneFlyImage from "../assets/animals/stonefly.svg";
import mayFlyImage from "../assets/animals/mayfly.svg";
import caddisFlyImage from "../assets/animals/caddisfly.svg";
import dobsonFlyImage from "../assets/animals/dobsonfly.svg";
import riffleBeetleImage from "../assets/animals/rifflebeetle.svg";
import dragonFlyImage from "../assets/animals/dragonfly.svg";
import scudImage from "../assets/animals/scud.svg";
import clamOrMusselImage from "../assets/animals/clammussel.svg";
import crayFishImage from "../assets/animals/crayfish.svg";
import midgeFlyImage from "../assets/animals/midgefly.svg";
import blackFlyImage from "../assets/animals/blackfly.svg";
import planarianImage from "../assets/animals/planarian.svg";
import leechImage from "../assets/animals/leech.svg";
import aquaticWormImage from "../assets/animals/aquaticworm.svg";
import stoneFlyDragImage from "../assets/animals/drag-previews/stonefly.png";
import mayFlyDragImage from "../assets/animals/drag-previews/mayfly.png";
import caddisFlyDragImage from "../assets/animals/drag-previews/caddisfly.png";
import dobsonFlyDragImage from "../assets/animals/drag-previews/dobsonfly.png";
import riffleBeetleDragImage from "../assets/animals/drag-previews/rifflebeetle.png";
import dragonFlyDragImage from "../assets/animals/drag-previews/dragonfly.png";
import scudDragImage from "../assets/animals/drag-previews/scud.png";
import clamOrMusselDragImage from "../assets/animals/drag-previews/clammussel.png";
import crayFishDragImage from "../assets/animals/drag-previews/crayfish.png";
import midgeFlyDragImage from "../assets/animals/drag-previews/midgefly.png";
import blackFlyDragImage from "../assets/animals/drag-previews/blackfly.png";
import planarianDragImage from "../assets/animals/drag-previews/planarian.png";
import leechDragImage from "../assets/animals/drag-previews/leech.png";
import aquaticWormDragImage from "../assets/animals/drag-previews/aquaticworm.png";

import leafBirch0Image from "../assets/leaves/leaf-birch-0.svg";
import leafBirch1Image from "../assets/leaves/leaf-birch-1.svg";
import leafBirch2Image from "../assets/leaves/leaf-birch-2.svg";
import leafBirch3Image from "../assets/leaves/leaf-birch-3.svg";
import leafBirch4Image from "../assets/leaves/leaf-birch-4.svg";
import leafBirch5Image from "../assets/leaves/leaf-birch-5.svg";
import leafBirch6Image from "../assets/leaves/leaf-birch-6.svg";
import leafMaple0Image from "../assets/leaves/leaf-maple-0.svg";
import leafMaple1Image from "../assets/leaves/leaf-maple-1.svg";
import leafMaple2Image from "../assets/leaves/leaf-maple-2.svg";
import leafMaple3Image from "../assets/leaves/leaf-maple-3.svg";
import leafMaple4Image from "../assets/leaves/leaf-maple-4.svg";
import leafMaple5Image from "../assets/leaves/leaf-maple-5.svg";
import leafMaple6Image from "../assets/leaves/leaf-maple-6.svg";
import leafOak0Image from "../assets/leaves/leaf-oak-0.svg";
import leafOak1Image from "../assets/leaves/leaf-oak-1.svg";
import leafOak2Image from "../assets/leaves/leaf-oak-2.svg";
import leafOak3Image from "../assets/leaves/leaf-oak-3.svg";
import leafOak4Image from "../assets/leaves/leaf-oak-4.svg";
import leafOak5Image from "../assets/leaves/leaf-oak-5.svg";
import leafOak6Image from "../assets/leaves/leaf-oak-6.svg";
import leafBirch0DragImage from "../assets/leaves/drag-previews/leaf-birch-0.png";
import leafBirch1DragImage from "../assets/leaves/drag-previews/leaf-birch-1.png";
import leafBirch2DragImage from "../assets/leaves/drag-previews/leaf-birch-2.png";
import leafBirch3DragImage from "../assets/leaves/drag-previews/leaf-birch-3.png";
import leafBirch4DragImage from "../assets/leaves/drag-previews/leaf-birch-4.png";
import leafBirch5DragImage from "../assets/leaves/drag-previews/leaf-birch-5.png";
import leafBirch6DragImage from "../assets/leaves/drag-previews/leaf-birch-6.png";
import leafMaple0DragImage from "../assets/leaves/drag-previews/leaf-maple-0.png";
import leafMaple1DragImage from "../assets/leaves/drag-previews/leaf-maple-1.png";
import leafMaple2DragImage from "../assets/leaves/drag-previews/leaf-maple-2.png";
import leafMaple3DragImage from "../assets/leaves/drag-previews/leaf-maple-3.png";
import leafMaple4DragImage from "../assets/leaves/drag-previews/leaf-maple-4.png";
import leafMaple5DragImage from "../assets/leaves/drag-previews/leaf-maple-5.png";
import leafMaple6DragImage from "../assets/leaves/drag-previews/leaf-maple-6.png";
import leafOak0DragImage from "../assets/leaves/drag-previews/leaf-oak-0.png";
import leafOak1DragImage from "../assets/leaves/drag-previews/leaf-oak-1.png";
import leafOak2DragImage from "../assets/leaves/drag-previews/leaf-oak-2.png";
import leafOak3DragImage from "../assets/leaves/drag-previews/leaf-oak-3.png";
import leafOak4DragImage from "../assets/leaves/drag-previews/leaf-oak-4.png";
import leafOak5DragImage from "../assets/leaves/drag-previews/leaf-oak-5.png";
import leafOak6DragImage from "../assets/leaves/drag-previews/leaf-oak-6.png";

import FishA from "../assets/animations/fish/Frame 1,5,9.png";
import FishB from "../assets/animations/fish/Frame 2,4.png";
import FishC from "../assets/animations/fish/Frame 3.png";
import FishD from "../assets/animations/fish/Frame 6,8.png";
import FishE from "../assets/animations/fish/Frame 7.png";

import BeaverA from "../assets/animations/beaver/beaver-1.png";
import BeaverB from "../assets/animations/beaver/beaver-2.png";
import BeaverC from "../assets/animations/beaver/beaver-3.png";
import BeaverD from "../assets/animations/beaver/beaver-4.png";
import BeaverE from "../assets/animations/beaver/beaver-5.png";
import BeaverF from "../assets/animations/beaver/beaver-6.png";

import RiffleA1 from "../assets/animations/riffle/rifflea-1.png";
import RiffleA2 from "../assets/animations/riffle/rifflea-2.png";
import RiffleA3 from "../assets/animations/riffle/rifflea-3.png";
import RiffleA4 from "../assets/animations/riffle/rifflea-4.png";
import RiffleB1 from "../assets/animations/riffle/riffleb-1.png";
import RiffleB2 from "../assets/animations/riffle/riffleb-2.png";
import RiffleB3 from "../assets/animations/riffle/riffleb-3.png";
import RiffleB4 from "../assets/animations/riffle/riffleb-4.png";

import { stoneFlySelectionPath, mayFlySelectionPath, caddisFlySelectionPath, dobsonFlySelectionPath,
  riffleBeetleSelectionPath, dragonFlySelectionPath, scudSelectionPath, clamOrMusselSelectionPath, crayFishSelectionPath,
  midgeFlySelectionPath, blackFlySelectionPath, planarianSelectionPath, leechSelectionPath, aquaticWormSelectionPath,
  oak0SelectionPath, oak1SelectionPath, oak2SelectionPath, oak3SelectionPath, oak4SelectionPath, oak5SelectionPath,
  oak6SelectionPath, birch0SelectionPath, birch1SelectionPath, birch2SelectionPath, birch3SelectionPath, birch4SelectionPath,
  birch5SelectionPath, birch6SelectionPath, maple0SelectionPath, maple1SelectionPath, maple2SelectionPath, maple3SelectionPath,
  maple4SelectionPath, maple5SelectionPath, maple6SelectionPath
} from "./selection-utils";

export const sunnyDaySliderMarks = [
  {
    value: 0,
    label: t("SUNNYDAY.FEW")
  },
  {
    value: 1,
    label: t("SUNNYDAY.MANY")
  }
];

// non-translated labels for logging
export const getSunnyDayLogLabel = (value: number) => {
  const labels: Record<number, string> = {
    0: t("SUNNYDAY.FEW", {lang: "en"}),
    1: t("SUNNYDAY.MANY", {lang: "en"}),
  };
  return labels[value] || "Label not found";
};

export enum LeafDecompositionType {
  little = "little",
  some = "some",
  lots = "lots",
}

export interface LeafDecompositionFinalValue {
  value: LeafDecompositionType;
  environment: EnvironmentType;
  sunny: boolean;
}

export const LeafDecompositionFinalValues: LeafDecompositionFinalValue[] = [
  { environment: EnvironmentType.environment1, value: LeafDecompositionType.lots, sunny: false},
  { environment: EnvironmentType.environment1, value: LeafDecompositionType.some, sunny: true},
  { environment: EnvironmentType.environment2, value: LeafDecompositionType.lots, sunny: false},
  { environment: EnvironmentType.environment2, value: LeafDecompositionType.some, sunny: true},
  { environment: EnvironmentType.environment3, value: LeafDecompositionType.some, sunny: false},
  { environment: EnvironmentType.environment3, value: LeafDecompositionType.some, sunny: true},
  { environment: EnvironmentType.environment4, value: LeafDecompositionType.little, sunny: false},
  { environment: EnvironmentType.environment4, value: LeafDecompositionType.little, sunny: true},
];

export enum LeafEatersAmountType {
  few = "few",
  some = "some",
  lots = "lots",
}

export interface LeafEatersFinalValue {
  value: LeafEatersAmountType;
  environment: EnvironmentType;
  sunny: boolean;
}

export const LeafEatersFinalValues: LeafEatersFinalValue[] = [
  { environment: EnvironmentType.environment1, value: LeafEatersAmountType.lots, sunny: false},
  { environment: EnvironmentType.environment1, value: LeafEatersAmountType.some, sunny: true},
  { environment: EnvironmentType.environment2, value: LeafEatersAmountType.few, sunny: false},
  { environment: EnvironmentType.environment2, value: LeafEatersAmountType.few, sunny: true},
  { environment: EnvironmentType.environment3, value: LeafEatersAmountType.few, sunny: false},
  { environment: EnvironmentType.environment3, value: LeafEatersAmountType.few, sunny: true},
  { environment: EnvironmentType.environment4, value: LeafEatersAmountType.few, sunny: false},
  { environment: EnvironmentType.environment4, value: LeafEatersAmountType.few, sunny: true},
];

export enum AlgaeEatersAmountType {
  few = "few",
  some = "some",
  lots = "lots",
}

export interface AlgaeEatersFinalValue {
  value: AlgaeEatersAmountType;
  environment: EnvironmentType;
  sunny: boolean;
}

export const AlgaeEatersFinalValues: AlgaeEatersFinalValue[] = [
  { environment: EnvironmentType.environment1, value: AlgaeEatersAmountType.few, sunny: false},
  { environment: EnvironmentType.environment1, value: AlgaeEatersAmountType.some, sunny: true},
  { environment: EnvironmentType.environment2, value: AlgaeEatersAmountType.few, sunny: false},
  { environment: EnvironmentType.environment2, value: AlgaeEatersAmountType.few, sunny: true},
  { environment: EnvironmentType.environment3, value: AlgaeEatersAmountType.some, sunny: false},
  { environment: EnvironmentType.environment3, value: AlgaeEatersAmountType.lots, sunny: true},
  { environment: EnvironmentType.environment4, value: AlgaeEatersAmountType.lots, sunny: false},
  { environment: EnvironmentType.environment4, value: AlgaeEatersAmountType.lots, sunny: true},
];

export enum FishAmountType {
  none = "none",
  few = "few",
  some = "some",
  lots = "lots",
}

export interface FishFinalValue {
  value: FishAmountType;
  environment: EnvironmentType;
  sunny: boolean;
}

export const FishFinalValues: FishFinalValue[] = [
  { environment: EnvironmentType.environment1, value: FishAmountType.lots, sunny: false},
  { environment: EnvironmentType.environment1, value: FishAmountType.some, sunny: true},
  { environment: EnvironmentType.environment2, value: FishAmountType.some, sunny: false},
  { environment: EnvironmentType.environment2, value: FishAmountType.some, sunny: true},
  { environment: EnvironmentType.environment3, value: FishAmountType.some, sunny: false},
  { environment: EnvironmentType.environment3, value: FishAmountType.few, sunny: true},
  { environment: EnvironmentType.environment4, value: FishAmountType.few, sunny: false}, //TODO: should be none
  { environment: EnvironmentType.environment4, value: FishAmountType.few, sunny: true}, //TODO: should be none
];

export enum AnimalType {
  stoneFly = "stoneFly",
  mayFly = "mayFly",
  caddisFly = "caddisFly",
  dobsonFly = "dobsonFly",
  riffleBeetle = "riffleBeetle",
  dragonFly = "dragonFly",
  scud = "scud",
  clamOrMussel = "clamOrMussel",
  crayFish = "crayFish",
  midgeFly = "midgeFly",
  blackFly = "blackFly",
  planarian = "planarian",
  leech = "leech",
  aquaticWorm = "aquaticWorm",
}

export interface AbundanceRange {
  min: number;
  max: number;
}

export interface EnvironmentAbundance {
  sunny: AbundanceRange;
  notSunny: AbundanceRange;
}

export enum SensitivityType {
  sensitive = "sensitive",
  somewhatSensitive = "somewhatSensitive",
  tolerant = "tolerant",
}

export interface Sensitivity {
  type: SensitivityType;
  label: string;
  blockColor: string;
  backgroundColor: string;
  graphColor: string;
}

export const Sensitivities: Sensitivity[] = [
  {
    type: SensitivityType.sensitive,
    label: t("SENSITIVITY.1"),
    blockColor: "#B2E6FA",
    backgroundColor: "#D9F3FD",
    graphColor: "#00AEEF",
  },
  {
    type: SensitivityType.somewhatSensitive,
    label: t("SENSITIVITY.2"),
    blockColor: "#BFBFDA",
    backgroundColor: "#DFDFED",
    graphColor: "#2A2B86",
  },
  {
    type: SensitivityType.tolerant,
    label: t("SENSITIVITY.3"),
    blockColor: "#FCD9BC",
    backgroundColor: "#FEEDDE",
    graphColor: "#F58221",
  },
];

export interface Animal {
  type: AnimalType;
  label: string;
  abundance: Record<EnvironmentType, EnvironmentAbundance>;
  image: any;
  dragImage: any;
  sensitivity: SensitivityType;
  width: number;
  height: number;
  selectionPath: string;
}

export const Animals: Animal[] = [
  { type: AnimalType.aquaticWorm, label: t("ANIMAL.AQUATICWORM"), image: aquaticWormImage, dragImage: aquaticWormDragImage,
    sensitivity: SensitivityType.tolerant, width: 47, height: 39, selectionPath: aquaticWormSelectionPath,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.blackFly, label: t("ANIMAL.BLACKFLY"), image: blackFlyImage, dragImage: blackFlyDragImage,
    sensitivity: SensitivityType.tolerant, width: 37, height: 16, selectionPath: blackFlySelectionPath,
    abundance: { "environment1": {sunny: {min: 21, max: 29}, notSunny: { min: 21, max: 29 }},
                 "environment2": {sunny: {min: 12, max: 18}, notSunny: { min: 12, max: 18 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.caddisFly, label: t("ANIMAL.CADDISFLY"), image: caddisFlyImage, dragImage: caddisFlyDragImage,
    sensitivity: SensitivityType.sensitive, width: 65, height: 40, selectionPath: caddisFlySelectionPath,
    abundance: { "environment1": {sunny: {min: 8, max: 12}, notSunny: { min: 8, max: 12 }},
                 "environment2": {sunny: {min: 8, max: 12}, notSunny: { min: 8, max: 12 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.clamOrMussel, label: t("ANIMAL.CLAMORMUSSEL"), image: clamOrMusselImage, dragImage: clamOrMusselDragImage,
    sensitivity: SensitivityType.somewhatSensitive, width: 106, height: 58, selectionPath: clamOrMusselSelectionPath,
    abundance: { "environment1": {sunny: {min: 2, max: 4}, notSunny: { min: 2, max: 4 }},
                 "environment2": {sunny: {min: 2, max: 4}, notSunny: { min: 2, max: 4 }},
                 "environment3": {sunny: {min: 2, max: 4}, notSunny: { min: 2, max: 4 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.crayFish, label: t("ANIMAL.CRAYFISH"), image: crayFishImage, dragImage: crayFishDragImage,
    sensitivity: SensitivityType.somewhatSensitive, width: 190, height: 112, selectionPath: crayFishSelectionPath,
    abundance: { "environment1": {sunny: {min: 3, max: 5}, notSunny: { min: 3, max: 5 }},
                 "environment2": {sunny: {min: 1, max: 3}, notSunny: { min: 1, max: 3 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.dobsonFly, label: t("ANIMAL.DOBSONFLY"), image: dobsonFlyImage, dragImage: dobsonFlyDragImage,
    sensitivity: SensitivityType.sensitive, width: 82, height: 60, selectionPath: dobsonFlySelectionPath,
    abundance: { "environment1": {sunny: {min: 1, max: 3}, notSunny: { min: 1, max: 3 }},
                 "environment2": {sunny: {min: 1, max: 3}, notSunny: { min: 1, max: 3 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.dragonFly, label: t("ANIMAL.DRAGONFLY"), image: dragonFlyImage, dragImage: dragonFlyDragImage,
    sensitivity: SensitivityType.somewhatSensitive, width: 69, height: 56, selectionPath: dragonFlySelectionPath,
    abundance: { "environment1": {sunny: {min: 6, max: 8}, notSunny: { min: 6, max: 8 }},
                 "environment2": {sunny: {min: 4, max: 6}, notSunny: { min: 4, max: 6 }},
                 "environment3": {sunny: {min: 1, max: 3}, notSunny: { min: 1, max: 3 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.leech, label: t("ANIMAL.LEECH"), image: leechImage, dragImage: leechDragImage,
    sensitivity: SensitivityType.tolerant, width: 58, height: 24, selectionPath: leechSelectionPath,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 1, max: 3}, notSunny: { min: 1, max: 3 }},
                 "environment4": {sunny: {min: 2, max: 4}, notSunny: { min: 2, max: 4 }} }
  },
  { type: AnimalType.mayFly, label: t("ANIMAL.MAYFLY"), image: mayFlyImage, dragImage: mayFlyDragImage,
    sensitivity: SensitivityType.sensitive, width: 97, height: 43, selectionPath: mayFlySelectionPath,
    abundance: { "environment1": {sunny: {min: 10, max: 20}, notSunny: { min: 10, max: 20 }},
                 "environment2": {sunny: {min: 10, max: 20}, notSunny: { min: 10, max: 20 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.midgeFly, label: t("ANIMAL.MIDGEFLY"), image: midgeFlyImage, dragImage: midgeFlyDragImage,
    sensitivity: SensitivityType.tolerant, width: 45, height: 24, selectionPath: midgeFlySelectionPath,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 16, max: 24}, notSunny: { min: 16, max: 24 }},
                 "environment4": {sunny: {min: 40, max: 60}, notSunny: { min: 40, max: 60 }} }
  },
  { type: AnimalType.planarian, label: t("ANIMAL.PLANARIAN"), image: planarianImage, dragImage: planarianDragImage,
    sensitivity: SensitivityType.tolerant, width: 45, height: 22, selectionPath: planarianSelectionPath,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 4, max: 6}, notSunny: { min: 4, max: 6 }},
                 "environment4": {sunny: {min: 4, max: 6}, notSunny: { min: 4, max: 6 }} }
  },
  { type: AnimalType.riffleBeetle, label: t("ANIMAL.RIFFLEBEETLE"), image: riffleBeetleImage, dragImage: riffleBeetleDragImage,
    sensitivity: SensitivityType.sensitive, width: 42, height: 39, selectionPath: riffleBeetleSelectionPath,
    abundance: { "environment1": {sunny: {min: 6, max: 10}, notSunny: { min: 6, max: 10 }},
                 "environment2": {sunny: {min: 7, max: 9}, notSunny: { min: 7, max: 8 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.scud, label: t("ANIMAL.SCUD"), image: scudImage, dragImage: scudDragImage,
    sensitivity: SensitivityType.somewhatSensitive, width: 48, height: 37, selectionPath: scudSelectionPath,
    abundance: { "environment1": {sunny: {min: 7, max: 13}, notSunny: { min: 7, max: 13 }},
                 "environment2": {sunny: {min: 7, max: 13}, notSunny: { min: 7, max: 13 }},
                 "environment3": {sunny: {min: 3, max: 7}, notSunny: { min: 3, max: 7 }},
                 "environment4": {sunny: {min: 3, max: 7}, notSunny: { min: 3, max: 7 }} }
  },
  { type: AnimalType.stoneFly, label: t("ANIMAL.STONEFLY"), image: stoneFlyImage, dragImage: stoneFlyDragImage,
    sensitivity: SensitivityType.sensitive, width: 86, height: 47, selectionPath: stoneFlySelectionPath,
    abundance: { "environment1": {sunny: {min: 2, max: 6}, notSunny: { min: 2, max: 6 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  }
];

export function getAnimal(type: AnimalType) {
  return Animals.find(animal => animal.type === type);
}

export interface AnimalInstance {
  type: AnimalType;
  spawnTime: number;
  spawned: boolean;
}

export interface LeafPackConfiguration {
  environment: EnvironmentType;
  top: number;
  left: number;
}

export const LeafPackConfigurations: LeafPackConfiguration[] = [
  { environment: EnvironmentType.environment1, top: 259, left: 90 },
  { environment: EnvironmentType.environment2, top: 255, left: 85 },
  { environment: EnvironmentType.environment3, top: 241, left: 231 },
  { environment: EnvironmentType.environment4, top: 239, left: 172 }
];

export interface LeafPackState {
  leafDecomposition: LeafDecompositionType;
  image: any;
  altText: string;
}

export const LeafPackStates: LeafPackState[] = [
  { leafDecomposition: LeafDecompositionType.little, image: LeafPackImage1, altText: t("LEAFPACK.LITTLE") },
  { leafDecomposition: LeafDecompositionType.some, image: LeafPackImage2, altText: t("LEAFPACK.SOME") },
  { leafDecomposition: LeafDecompositionType.lots, image: LeafPackImage3, altText: t("LEAFPACK.LOTS") }
];

// The content that we position and display visually on the sim
export enum SimAnimationType {
  fish = "fish",
  beaver = "beaver",
  riffleA = "riffleA",
  riffleB = "riffleB"
}

export interface SimAnimationLayout {
  environment: EnvironmentType;
  left: number,
  top: number;
  xScale: number;
  yScale: number;
  rotation: number;
}

export interface SimAnimationConfiguration {
  type: SimAnimationType;
  frames: any[],
  layouts: SimAnimationLayout[],
  altText: string;
}

export const simAnimationConfigurations: SimAnimationConfiguration[] = [
  { type: SimAnimationType.fish,
    frames: [FishA, FishB, FishC, FishB, FishA, FishD, FishE, FishD],
    layouts: [
      { environment: EnvironmentType.environment1, left: 140, top: 235, xScale: 1, yScale: 1, rotation: 0 },
      { environment: EnvironmentType.environment1, left: 70, top: 260, xScale: -.9, yScale: .9, rotation: 0 },
      { environment: EnvironmentType.environment1, left: 165, top: 190, xScale: .8, yScale: .8, rotation: 0 },
      { environment: EnvironmentType.environment1, left: 195, top: 195, xScale: .8, yScale: .8, rotation: 0 },
      { environment: EnvironmentType.environment1, left: 195, top: 175, xScale: .6, yScale: .6, rotation: 0 },

      { environment: EnvironmentType.environment2, left: 160, top: 230, xScale: 1, yScale: 1, rotation: 0 },
      { environment: EnvironmentType.environment2, left: 195, top: 195, xScale: .9, yScale: .9, rotation: 0 },
      { environment: EnvironmentType.environment2, left: 125, top: 242, xScale: .8, yScale: .8, rotation: 0 },
      { environment: EnvironmentType.environment2, left: 160, top: 195, xScale: .7, yScale: .7, rotation: 0 },
      { environment: EnvironmentType.environment2, left: 195, top: 190, xScale: .7, yScale: .7, rotation: 0 },

      { environment: EnvironmentType.environment3, left: 200, top: 235, xScale: -1, yScale: 1, rotation: 0 },
      { environment: EnvironmentType.environment3, left: 235, top: 225, xScale: .9, yScale: .9, rotation: 0 },
      { environment: EnvironmentType.environment3, left: 185, top: 195, xScale: -.8, yScale: .8, rotation: 0 },
      { environment: EnvironmentType.environment3, left: 100, top: 100, xScale: .5, yScale: .5, rotation: 0 },
      { environment: EnvironmentType.environment3, left: 100, top: 100, xScale: .5, yScale: .5, rotation: 0 },

      { environment: EnvironmentType.environment4, left: 248, top: 235, xScale: 1, yScale: 1, rotation: 0 },
      { environment: EnvironmentType.environment4, left: 100, top: 100, xScale: .5, yScale: .5, rotation: 0 },
      { environment: EnvironmentType.environment4, left: 100, top: 100, xScale: .5, yScale: .5, rotation: 0 },
      { environment: EnvironmentType.environment4, left: 100, top: 100, xScale: .5, yScale: .5, rotation: 0 },
      { environment: EnvironmentType.environment4, left: 100, top: 100, xScale: .5, yScale: .5, rotation: 0 },
    ],
    altText: t("SIMANIMAL.FISH")
  },
  { type: SimAnimationType.beaver,
    frames: [BeaverA, BeaverB, BeaverC, BeaverD,
             BeaverD, BeaverD, BeaverD, BeaverD, BeaverD, BeaverD, BeaverD, BeaverD, BeaverD,
             BeaverE, BeaverF, BeaverE, BeaverD,
             BeaverD, BeaverD, BeaverD, BeaverD, BeaverD, BeaverD, BeaverD, BeaverD, BeaverD,
             BeaverC, BeaverB, BeaverA,
             BeaverA, BeaverA, BeaverA, BeaverA, BeaverA, BeaverA, BeaverA, BeaverA, BeaverA,
            ],
    layouts: [
      { environment: EnvironmentType.environment1, left: 122, top: 142, xScale: 2, yScale: 2, rotation: 0 },
    ],
    altText: t("SIMANIMAL.BEAVER")
  },
  { type: SimAnimationType.riffleA,
    frames: [RiffleA1, RiffleA2, RiffleA3, RiffleA4],
    layouts: [
      { environment: EnvironmentType.environment1, left: 251, top: 130, xScale: 5.52, yScale: 5.52, rotation: 0 },
    ],
    altText: t("SIMOBJECT.RIFFLE")
  },
  { type: SimAnimationType.riffleB,
    frames: [RiffleB1, RiffleB2, RiffleB3, RiffleB4],
    layouts: [
      { environment: EnvironmentType.environment2, left: 261, top: 131, xScale: 6.165, yScale: 6.165, rotation: 0 },
    ],
    altText: t("SIMOBJECT.RIFFLE")
  },
];

export interface SimAnimation {
  frames: any[],
  left: number;
  top: number;
  xScale: number;
  yScale: number;
  rotation: number;
  altText: string;
  key?: string;
}

// The content that is positioned and shown in the tray
export const kMinTrayX = 30;
export const kMaxTrayX = 414;
export const kMinTrayY = 80;
export const kMaxTrayY = 312;
export const kTraySpawnPadding = 50;

export const kMinLeaves = 7;
export const kMaxLeaves = 10;

export enum LeafType {
  maple0 = "maple0",
  maple1 = "maple1",
  maple2 = "maple2",
  maple3 = "maple3",
  maple4 = "maple4",
  maple5 = "maple5",
  maple6 = "maple6",
  oak0 = "oak0",
  oak1 = "oak1",
  oak2 = "oak2",
  oak3 = "oak3",
  oak4 = "oak4",
  oak5 = "oak5",
  oak6 = "oak6",
  birch0 = "birch0",
  birch1 = "birch1",
  birch2 = "birch2",
  birch3 = "birch3",
  birch4 = "birch4",
  birch5 = "birch5",
  birch6 = "birch6",
}

export interface Leaf {
  type: LeafType;
  image: any;
  dragImage: any;
  width: number;
  height: number;
  selectionPath: string;
}

export const Leaves: Leaf[] = [
  { type: LeafType.birch0, image: leafBirch0Image, dragImage: leafBirch0DragImage, width: 74, height: 127, selectionPath: birch0SelectionPath },
  { type: LeafType.birch1, image: leafBirch1Image, dragImage: leafBirch1DragImage, width: 74, height: 127, selectionPath: birch1SelectionPath },
  { type: LeafType.birch2, image: leafBirch2Image, dragImage: leafBirch2DragImage, width: 74, height: 127, selectionPath: birch2SelectionPath },
  { type: LeafType.birch3, image: leafBirch3Image, dragImage: leafBirch3DragImage, width: 74, height: 127, selectionPath: birch3SelectionPath },
  { type: LeafType.birch4, image: leafBirch4Image, dragImage: leafBirch4DragImage, width: 74, height: 127, selectionPath: birch4SelectionPath },
  { type: LeafType.birch5, image: leafBirch5Image, dragImage: leafBirch5DragImage, width: 73, height: 127, selectionPath: birch5SelectionPath },
  { type: LeafType.birch6, image: leafBirch6Image, dragImage: leafBirch6DragImage, width: 73, height: 127, selectionPath: birch6SelectionPath },
  { type: LeafType.oak0, image: leafOak0Image, dragImage: leafOak0DragImage, width: 111, height: 176, selectionPath: oak0SelectionPath},
  { type: LeafType.oak1, image: leafOak1Image, dragImage: leafOak1DragImage, width: 111, height: 176, selectionPath: oak1SelectionPath},
  { type: LeafType.oak2, image: leafOak2Image, dragImage: leafOak2DragImage, width: 111, height: 176, selectionPath: oak2SelectionPath},
  { type: LeafType.oak3, image: leafOak3Image, dragImage: leafOak3DragImage, width: 111, height: 176, selectionPath: oak3SelectionPath},
  { type: LeafType.oak4, image: leafOak4Image, dragImage: leafOak4DragImage, width: 111, height: 176, selectionPath: oak4SelectionPath},
  { type: LeafType.oak5, image: leafOak5Image, dragImage: leafOak5DragImage, width: 111, height: 176, selectionPath: oak5SelectionPath},
  { type: LeafType.oak6, image: leafOak6Image, dragImage: leafOak6DragImage, width: 111, height: 176, selectionPath: oak6SelectionPath},
  { type: LeafType.maple0, image: leafMaple0Image, dragImage: leafMaple0DragImage, width: 146, height: 160, selectionPath: maple0SelectionPath },
  { type: LeafType.maple1, image: leafMaple1Image, dragImage: leafMaple1DragImage, width: 146, height: 160, selectionPath: maple1SelectionPath },
  { type: LeafType.maple2, image: leafMaple2Image, dragImage: leafMaple2DragImage, width: 146, height: 160, selectionPath: maple2SelectionPath },
  { type: LeafType.maple3, image: leafMaple3Image, dragImage: leafMaple3DragImage, width: 146, height: 160, selectionPath: maple3SelectionPath },
  { type: LeafType.maple4, image: leafMaple4Image, dragImage: leafMaple4DragImage, width: 146, height: 160, selectionPath: maple4SelectionPath },
  { type: LeafType.maple5, image: leafMaple5Image, dragImage: leafMaple5DragImage, width: 132, height: 160, selectionPath: maple5SelectionPath },
  { type: LeafType.maple6, image: leafMaple6Image, dragImage: leafMaple6DragImage, width: 132, height: 160, selectionPath: maple6SelectionPath },
];

export type TrayType = AnimalType | LeafType;

export interface TrayObject {
  type: TrayType;
  trayIndex: number;
  count: number;
  collected: boolean;
  left: number;
  top: number;
  width: number;
  height: number;
  boundingBoxWidth: number;
  boundingBoxHeight: number;
  rotation: number;
  image: any;
  dragImage: any;
  selectionPath: string;
  zIndex: number;
}

export const draggableAnimalTypes = [
  AnimalType.stoneFly, AnimalType.mayFly, AnimalType.caddisFly, AnimalType.dobsonFly,
  AnimalType.riffleBeetle, AnimalType.dragonFly, AnimalType.scud, AnimalType.clamOrMussel,
  AnimalType.crayFish, AnimalType.midgeFly, AnimalType.blackFly, AnimalType.planarian,
  AnimalType.leech, AnimalType.aquaticWorm
];

export const draggableLeafTypes = [
  LeafType.birch0, LeafType.birch1, LeafType.birch2, LeafType.birch3, LeafType.birch4, LeafType.birch5, LeafType.birch6,
  LeafType.oak0, LeafType.oak1, LeafType.oak2, LeafType.oak3, LeafType.oak4, LeafType.oak5, LeafType.oak6,
  LeafType.maple0, LeafType.maple1, LeafType.maple2, LeafType.maple3, LeafType.maple4, LeafType.maple5, LeafType.maple6
];
