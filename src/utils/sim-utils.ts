import EnvironmentImage1 from "../assets/environment1.png";
import EnvironmentImage2 from "../assets/environment2.png";
import EnvironmentImage3 from "../assets/environment3.png";
import EnvironmentImage4 from "../assets/environment4.png";
import EnvironmentSketchImage1 from "../assets/environment-sketch1.png";
import EnvironmentSketchImage2 from "../assets/environment-sketch2.png";
import EnvironmentSketchImage3 from "../assets/environment-sketch3.png";
import EnvironmentSketchImage4 from "../assets/environment-sketch4.png";
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

import leafBirchImage from "../assets/leaves/leaf-birch.svg";
import leafMapleImage from "../assets/leaves/leaf-maple.svg";
import leafOakImage from "../assets/leaves/leaf-oak.svg";
import leafBirchDragImage from "../assets/leaves/drag-previews/leaf-birch.png";
import leafMapleDragImage from "../assets/leaves/drag-previews/leaf-maple.png";
import leafOakDragImage from "../assets/leaves/drag-previews/leaf-oak.png";

import FishA from "../assets/animations/fish/Frame 1,5,9.png";
import FishB from "../assets/animations/fish/Frame 2,4.png";
import FishC from "../assets/animations/fish/Frame 3.png";
import FishD from "../assets/animations/fish/Frame 6,8.png";
import FishE from "../assets/animations/fish/Frame 7.png";

import { testSelectionPath, stoneFlySelectionPath, mayFlySelectionPath, caddisFlySelectionPath, dobsonFlySelectionPath, riffleBeetleSelectionPath,
  dragonFlySelectionPath, scudSelectionPath, clamOrMusselSelectionPath, crayFishSelectionPath, midgeFlySelectionPath, blackFlySelectionPath,
  planarianSelectionPath, leechSelectionPath, aquaticWormSelectionPath } from "./selection-utils";

import t from "./translation/translate";

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

export enum EnvironmentType {
  environment1 = "environment1",
  environment2 = "environment2",
  environment3 = "environment3",
  environment4 = "environment4",
}

export interface Environment {
  type: EnvironmentType;
  name: string;
  backgroundImage: any;
  sketchImage: any;
}

export const Environments: Environment[] = [
  {
    type: EnvironmentType.environment1,
    name: t("ENVIRONMENT.1"),
    backgroundImage: EnvironmentImage1,
    sketchImage: EnvironmentSketchImage1
  },
  {
    type: EnvironmentType.environment2,
    name: t("ENVIRONMENT.2"),
    backgroundImage: EnvironmentImage2,
    sketchImage: EnvironmentSketchImage2
  },
  {
    type: EnvironmentType.environment3,
    name: t("ENVIRONMENT.3"),
    backgroundImage: EnvironmentImage3,
    sketchImage: EnvironmentSketchImage3
  },
  {
    type: EnvironmentType.environment4,
    name: t("ENVIRONMENT.4"),
    backgroundImage: EnvironmentImage4,
    sketchImage: EnvironmentSketchImage4
  },
];

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
  { environment: EnvironmentType.environment1, value: LeafDecompositionType.lots, sunny: true},
  { environment: EnvironmentType.environment2, value: LeafDecompositionType.little, sunny: false}, // TODO: get final val
  { environment: EnvironmentType.environment2, value: LeafDecompositionType.little, sunny: true}, // TODO: get final val
  { environment: EnvironmentType.environment3, value: LeafDecompositionType.some, sunny: false},
  { environment: EnvironmentType.environment3, value: LeafDecompositionType.little, sunny: true},
  { environment: EnvironmentType.environment4, value: LeafDecompositionType.little, sunny: false}, // TODO: get final val
  { environment: EnvironmentType.environment4, value: LeafDecompositionType.little, sunny: true}, // TODO: get final val
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
  { environment: EnvironmentType.environment2, value: FishAmountType.lots, sunny: true},
  { environment: EnvironmentType.environment3, value: FishAmountType.some, sunny: false},
  { environment: EnvironmentType.environment3, value: FishAmountType.some, sunny: true},
  { environment: EnvironmentType.environment4, value: FishAmountType.few, sunny: false},
  { environment: EnvironmentType.environment4, value: FishAmountType.few, sunny: true},
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
  { environment: EnvironmentType.environment1, top: 257, left: 90 },
  { environment: EnvironmentType.environment2, top: 255, left: 85 },
  { environment: EnvironmentType.environment3, top: 240, left: 231 },
  { environment: EnvironmentType.environment4, top: 237, left: 172 }
];

export interface LeafPackState {
  leafDecomposition: LeafDecompositionType;
  image: any;
}

export const LeafPackStates: LeafPackState[] = [
  { leafDecomposition: LeafDecompositionType.little, image: LeafPackImage1 },
  { leafDecomposition: LeafDecompositionType.some, image: LeafPackImage2 },
  { leafDecomposition: LeafDecompositionType.lots, image: LeafPackImage3 }
];

// The content that we position and display visually on the sim
export enum SimAnimationType {
  fish = "fish",
  crayFish = "crayFish",
}

export interface SimAnimationLayout {
  environment: EnvironmentType;
  left: number,
  top: number;
  xScale: number;
  yScale: number;
  rotation: number;
}

export interface SimAnimal {
  type: SimAnimationType;
  frames: any[],
  layouts: SimAnimationLayout[],
}

export const SimAnimals: SimAnimal[] = [
  { type: SimAnimationType.fish,
    frames: [FishA, FishB, FishC, FishB, FishA, FishD, FishE, FishD],
    layouts: [
      { environment: EnvironmentType.environment1, left: 160, top: 235, xScale: 1, yScale: 1, rotation: 0 },
      { environment: EnvironmentType.environment1, left: 70, top: 260, xScale: -.9, yScale: .9, rotation: 0 },
      { environment: EnvironmentType.environment1, left: 165, top: 190, xScale: .8, yScale: .8, rotation: 0 },
      { environment: EnvironmentType.environment1, left: 195, top: 200, xScale: .8, yScale: .8, rotation: 0 },
      { environment: EnvironmentType.environment1, left: 195, top: 175, xScale: .6, yScale: .6, rotation: 0 },

      { environment: EnvironmentType.environment2, left: 85, top: 235, xScale: -1, yScale: 1, rotation: 0 },
      { environment: EnvironmentType.environment2, left: 160, top: 230, xScale: .9, yScale: .9, rotation: 0 },
      { environment: EnvironmentType.environment2, left: 125, top: 225, xScale: .8, yScale: .8, rotation: 0 },
      { environment: EnvironmentType.environment2, left: 160, top: 195, xScale: .7, yScale: .7, rotation: 0 },
      { environment: EnvironmentType.environment2, left: 195, top: 190, xScale: .7, yScale: .7, rotation: 0 },

      { environment: EnvironmentType.environment3, left: 200, top: 235, xScale: -1, yScale: 1, rotation: 0 },
      { environment: EnvironmentType.environment3, left: 235, top: 225, xScale: .9, yScale: .9, rotation: 0 },
      { environment: EnvironmentType.environment3, left: 205, top: 195, xScale: -.8, yScale: .8, rotation: 0 },
      { environment: EnvironmentType.environment3, left: 100, top: 100, xScale: .5, yScale: .5, rotation: 0 },
      { environment: EnvironmentType.environment3, left: 100, top: 100, xScale: .5, yScale: .5, rotation: 0 },

      { environment: EnvironmentType.environment4, left: 248, top: 235, xScale: 1, yScale: 1, rotation: 0 },
      { environment: EnvironmentType.environment4, left: 100, top: 100, xScale: .5, yScale: .5, rotation: 0 },
      { environment: EnvironmentType.environment4, left: 100, top: 100, xScale: .5, yScale: .5, rotation: 0 },
      { environment: EnvironmentType.environment4, left: 100, top: 100, xScale: .5, yScale: .5, rotation: 0 },
      { environment: EnvironmentType.environment4, left: 100, top: 100, xScale: .5, yScale: .5, rotation: 0 },
    ]
  },
];

export interface SimAnimation {
  frames: any[],
  left: number;
  top: number;
  xScale: number;
  yScale: number;
  rotation: number;
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
  maple = "maple",
  oak = "oak",
  birch = "birch",
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
  { type: LeafType.birch, image: leafBirchImage, dragImage: leafBirchDragImage, width: 67, height: 116, selectionPath: testSelectionPath },
  { type: LeafType.oak, image: leafOakImage, dragImage: leafOakDragImage, width: 102, height: 164, selectionPath: testSelectionPath},
  { type: LeafType.maple, image: leafMapleImage, dragImage: leafMapleDragImage, width: 139, height: 151, selectionPath: testSelectionPath },
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
  LeafType.birch, LeafType.oak, LeafType.maple
];

// PTI
export interface PTIRatingLevel {
  color: string;
  label: string;
  range: string;
  min: number;
}

export const PTIRatingLevels: PTIRatingLevel[] = [
  {color: "#a4f9be", label: t("PTI.RATING.LEVEL0.LABEL"), range: t("PTI.RATING.LEVEL0.RANGE"), min: 24},
  {color: "#94e5ff", label: t("PTI.RATING.LEVEL1.LABEL"), range: t("PTI.RATING.LEVEL1.RANGE"), min: 17},
  {color: "#cccccc", label: t("PTI.RATING.LEVEL2.LABEL"), range: t("PTI.RATING.LEVEL2.RANGE"), min: 11},
  {color: "#ffacac", label: t("PTI.RATING.LEVEL3.LABEL"), range: t("PTI.RATING.LEVEL3.RANGE"), min: 0}
];
