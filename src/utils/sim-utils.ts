import EnvironmentImage1 from "../assets/environment1.png";
import EnvironmentImage2 from "../assets/environment2.png";
import EnvironmentImage3 from "../assets/environment3.png";
import EnvironmentImage4 from "../assets/environment4.png";
import LeafPackImage1 from "../assets/leafpack1.png";
import LeafPackImage2 from "../assets/leafpack2.png";
import LeafPackImage3 from "../assets/leafpack3.png";
import stoneFlyImage from "../assets/animals/stonefly.svg";
import mayFlyImage from "../assets/animals/mayfly.svg";
import caddisFlyImage from "../assets/animals/caddisfly.svg";
import dobsonFlyImage from "../assets/animals/dobsonfly.svg";
import riffleBeatleImage from "../assets/animals/rifflebeatle.svg";
import waterPennyImage from "../assets/animals/waterpenny.svg";
import gilledSnailImage from "../assets/animals/gilledsnail.svg";
import snipeFlyImage from "../assets/animals/snipefly.svg";
import damselFlyImage from "../assets/animals/damselfly.svg";
import dragonFlyImage from "../assets/animals/dragonfly.svg";
import sowBugImage from "../assets/animals/sowbug.svg";
import scudImage from "../assets/animals/scud.svg";
import craneFlyImage from "../assets/animals/cranefly.svg";
import clamOrMusselImage from "../assets/animals/clammussel.svg";
import crayFishImage from "../assets/animals/crayfish.svg";
import netSpinningCaddisFlyImage from "../assets/animals/netspinningcaddisfly.svg";
import midgeFlyImage from "../assets/animals/midgefly.svg";
import blackFlyImage from "../assets/animals/blackfly.svg";
import planarianImage from "../assets/animals/planarian.svg";
import leechImage from "../assets/animals/leech.svg";
import lungedSnailImage from "../assets/animals/lungedsnail.svg";
import aquaticWormImage from "../assets/animals/aquaticworm.svg";
import ratTailedMaggotImage from "../assets/animals/rattailedmaggot.svg";

import FishA from "../assets/animations/fish/Frame 1,5,9.png";
import FishB from "../assets/animations/fish/Frame 2,4.png";
import FishC from "../assets/animations/fish/Frame 3.png";
import FishD from "../assets/animations/fish/Frame 6,8.png";
import FishE from "../assets/animations/fish/Frame 7.png";

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
  enabled: boolean; // some environments are off in DESE version
}

export const Environments: Environment[] = [
  {
    type: EnvironmentType.environment1,
    name: t("ENVIRONMENT.1"),
    backgroundImage: EnvironmentImage1,
    enabled: true,
  },
  {
    type: EnvironmentType.environment2,
    name: t("ENVIRONMENT.2"),
    backgroundImage: EnvironmentImage2,
    enabled: true,
  },
  {
    type: EnvironmentType.environment3,
    name: t("ENVIRONMENT.3"),
    backgroundImage: EnvironmentImage3,
    enabled: true,
  },
  {
    type: EnvironmentType.environment4,
    name: t("ENVIRONMENT.4"),
    backgroundImage: EnvironmentImage4,
    enabled: true,
  },
];

export interface ScaleDisplayBlock {
  color: string;
  label: string;
}

export enum LeafDecompositionType {
  little = "little",
  some = "some",
  lots = "lots",
}

export interface LeafDecomposition {
  type: LeafDecompositionType;
  scaleDisplay: ScaleDisplayBlock;
}

export const LeafDecompositions: LeafDecomposition[] =
  [{ type: LeafDecompositionType.little, scaleDisplay: { color: "#ffe293", label: t("LEAFDECOMPOSITIONAMOUNT.LEVEL0") } },
   { type: LeafDecompositionType.some, scaleDisplay: { color: "#ebea70", label: t("LEAFDECOMPOSITIONAMOUNT.LEVEL1") } },
   { type: LeafDecompositionType.lots, scaleDisplay: { color: "#b6dcae", label: t("LEAFDECOMPOSITIONAMOUNT.LEVEL2") } }
  ];

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

export interface LeafEatersAmount {
  type: LeafEatersAmountType;
  scaleDisplay: ScaleDisplayBlock;
  max: number;
}

// for now this uses the caddisfly count: >5 is some, >8 is alot
export const LeafEatersAmounts: LeafEatersAmount[] =
  [{ type: LeafEatersAmountType.few, scaleDisplay: { color: "#ffe293", label: t("LEAFEATERSAMOUNT.LEVEL0") }, max: 5 },
   { type: LeafEatersAmountType.some, scaleDisplay: { color: "#ebea70", label: t("LEAFEATERSAMOUNT.LEVEL1") }, max: 8 },
   { type: LeafEatersAmountType.lots, scaleDisplay: { color: "#b6dcae", label: t("LEAFEATERSAMOUNT.LEVEL2") }, max: 9999 }
  ];

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

export interface AlgaeEatersAmount {
  type: AlgaeEatersAmountType;
  scaleDisplay: ScaleDisplayBlock;
  max: number;
}

// for now this uses the midgefly count: >10 is some, >16 is alot
export const AlgaeEatersAmounts: AlgaeEatersAmount[] =
  [{ type: AlgaeEatersAmountType.few, scaleDisplay: { color: "#ffe293", label: t("ALGAEEATERSAMOUNT.LEVEL0") }, max: 10 },
   { type: AlgaeEatersAmountType.some, scaleDisplay: { color: "#ebea70", label: t("ALGAEEATERSAMOUNT.LEVEL1") }, max: 16 },
   { type: AlgaeEatersAmountType.lots, scaleDisplay: { color: "#b6dcae", label: t("ALGAEEATERSAMOUNT.LEVEL2") }, max: 9999 }
  ];

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

export interface FishAmount {
  type: FishAmountType;
  scaleDisplay: ScaleDisplayBlock;
  max: number;
}

// for now this uses the crayfish count: >2 is some, >4 is alot
export const FishAmounts: FishAmount[] =
  [{ type: FishAmountType.few, scaleDisplay: { color: "#ffe293", label: t("FISHAMOUNT.LEVEL0") }, max: 2 },
   { type: FishAmountType.some, scaleDisplay: { color: "#ebea70", label: t("FISHAMOUNT.LEVEL1") }, max: 4 },
   { type: FishAmountType.lots, scaleDisplay: { color: "#b6dcae", label: t("FISHAMOUNT.LEVEL2") }, max: 9999 }
  ];

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

export enum AnimalSize {
  small = "small",
  large = "large",
}

export enum AnimalType {
  stoneFly = "stoneFly",
  mayFly = "mayFly",
  caddisFly = "caddisFly",
  dobsonFly = "dobsonFly",
  riffleBeatle = "riffleBeatle",
  waterPenny = "waterPenny",
  gilledSnail = "gilledSnail",
  snipeFly = "snipeFly",
  damselFly = "damselFly",
  dragonFly = "dragonFly",
  sowBug = "sowBug",
  scud = "scud",
  craneFly = "craneFly",
  clamOrMussel = "clamOrMussel",
  crayFish = "crayFish",
  netSpinningCaddisFly = "netSpinningCaddisFly",
  midgeFly = "midgeFly",
  blackFly = "blackFly",
  planarian = "planarian",
  leech = "leech",
  lungedSnail = "lungedSnail",
  aquaticWorm = "aquataquaticWormicWorms",
  ratTailedMaggot = "ratTailedMaggot",
}

export interface AbundanceRange {
  min: number;
  max: number;
}

export interface EnvironmentAbundance {
  sunny: AbundanceRange;
  notSunny: AbundanceRange;
}

export interface Animal {
  type: AnimalType;
  label: string;
  abundance: Record<EnvironmentType, EnvironmentAbundance>;
  size: AnimalSize;
  image: any;
}

export const Animals: Animal[] = [
  { type: AnimalType.stoneFly, label: t("ANIMAL.STONEFLY"), size: AnimalSize.small, image: stoneFlyImage,
    abundance: { "environment1": {sunny: {min: 2, max: 6}, notSunny: { min: 2, max: 6 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.mayFly, label: t("ANIMAL.MAYFLY"), size: AnimalSize.small, image: mayFlyImage,
    abundance: { "environment1": {sunny: {min: 10, max: 20}, notSunny: { min: 10, max: 20 }},
                 "environment2": {sunny: {min: 10, max: 20}, notSunny: { min: 10, max: 20 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.caddisFly, label: t("ANIMAL.CADDISFLY"), size: AnimalSize.small, image: caddisFlyImage,
    abundance: { "environment1": {sunny: {min: 8, max: 12}, notSunny: { min: 8, max: 12 }},
                 "environment2": {sunny: {min: 8, max: 12}, notSunny: { min: 8, max: 12 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.dobsonFly, label: t("ANIMAL.DOBSONFLY"), size: AnimalSize.small, image: dobsonFlyImage,
    abundance: { "environment1": {sunny: {min: 1, max: 3}, notSunny: { min: 1, max: 3 }},
                 "environment2": {sunny: {min: 1, max: 3}, notSunny: { min: 1, max: 3 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.riffleBeatle, label: t("ANIMAL.RIFFLEBEATLE"), size: AnimalSize.small, image: riffleBeatleImage,
    abundance: { "environment1": {sunny: {min: 6, max: 10}, notSunny: { min: 6, max: 10 }},
                 "environment2": {sunny: {min: 7, max: 9}, notSunny: { min: 7, max: 8 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.waterPenny, label: t("ANIMAL.WATERPENNY"), size: AnimalSize.small, image: waterPennyImage,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.gilledSnail, label: t("ANIMAL.GILLEDSNAIL"), size: AnimalSize.small, image: gilledSnailImage,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.snipeFly, label: t("ANIMAL.SNIPEFLY"), size: AnimalSize.small, image: snipeFlyImage,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.damselFly, label: t("ANIMAL.DAMSELFLY"), size: AnimalSize.small, image: damselFlyImage,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.dragonFly, label: t("ANIMAL.DRAGONFLY"), size: AnimalSize.small, image: dragonFlyImage,
    abundance: { "environment1": {sunny: {min: 6, max: 8}, notSunny: { min: 6, max: 8 }},
                 "environment2": {sunny: {min: 4, max: 6}, notSunny: { min: 4, max: 6 }},
                 "environment3": {sunny: {min: 1, max: 3}, notSunny: { min: 1, max: 3 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.sowBug, label: t("ANIMAL.SOWBUG"), size: AnimalSize.small, image: sowBugImage,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.scud, label: t("ANIMAL.SCUD"), size: AnimalSize.small, image: scudImage,
    abundance: { "environment1": {sunny: {min: 7, max: 13}, notSunny: { min: 7, max: 13 }},
                 "environment2": {sunny: {min: 7, max: 13}, notSunny: { min: 7, max: 13 }},
                 "environment3": {sunny: {min: 3, max: 7}, notSunny: { min: 3, max: 7 }},
                 "environment4": {sunny: {min: 3, max: 7}, notSunny: { min: 3, max: 7 }} }
  },
  { type: AnimalType.craneFly, label: t("ANIMAL.CRANEFLY"), size: AnimalSize.small, image: craneFlyImage,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.clamOrMussel, label: t("ANIMAL.CLAMORMUSSEL"), size: AnimalSize.small, image: clamOrMusselImage,
    abundance: { "environment1": {sunny: {min: 2, max: 4}, notSunny: { min: 2, max: 4 }},
                 "environment2": {sunny: {min: 2, max: 4}, notSunny: { min: 2, max: 4 }},
                 "environment3": {sunny: {min: 2, max: 4}, notSunny: { min: 2, max: 4 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.crayFish, label: t("ANIMAL.CRAYFISH"), size: AnimalSize.large, image: crayFishImage,
    abundance: { "environment1": {sunny: {min: 3, max: 5}, notSunny: { min: 3, max: 5 }},
                 "environment2": {sunny: {min: 1, max: 3}, notSunny: { min: 1, max: 3 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.netSpinningCaddisFly, label: t("ANIMAL.NETSPINNINGCADDISFLY"), size: AnimalSize.small, image: netSpinningCaddisFlyImage,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.midgeFly, label: t("ANIMAL.MIDGEFLY"), size: AnimalSize.small, image: midgeFlyImage,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 16, max: 24}, notSunny: { min: 16, max: 24 }},
                 "environment4": {sunny: {min: 40, max: 60}, notSunny: { min: 40, max: 60 }} }
  },
  { type: AnimalType.blackFly, label: t("ANIMAL.BLACKFLY"), size: AnimalSize.small, image: blackFlyImage,
    abundance: { "environment1": {sunny: {min: 21, max: 29}, notSunny: { min: 21, max: 29 }},
                 "environment2": {sunny: {min: 12, max: 18}, notSunny: { min: 12, max: 18 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.planarian, label: t("ANIMAL.PLANARIAN"), size: AnimalSize.small, image: planarianImage,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 4, max: 6}, notSunny: { min: 4, max: 6 }},
                 "environment4": {sunny: {min: 4, max: 6}, notSunny: { min: 4, max: 6 }} }
  },
  { type: AnimalType.leech, label: t("ANIMAL.LEECH"), size: AnimalSize.small, image: leechImage,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 1, max: 3}, notSunny: { min: 1, max: 3 }},
                 "environment4": {sunny: {min: 2, max: 4}, notSunny: { min: 2, max: 4 }} }
  },
  { type: AnimalType.lungedSnail, label: t("ANIMAL.LUNGEDSNAIL"), size: AnimalSize.small, image: lungedSnailImage,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.aquaticWorm, label: t("ANIMAL.AQUATICWORM"), size: AnimalSize.small, image: aquaticWormImage,
    abundance: { "environment1": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment2": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment3": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }},
                 "environment4": {sunny: {min: 0, max: 0}, notSunny: { min: 0, max: 0 }} }
  },
  { type: AnimalType.ratTailedMaggot, label: t("ANIMAL.RATTAILEDMAGGOT"), size: AnimalSize.small, image: ratTailedMaggotImage,
    abundance: { "environment1": {sunny: {min: 4, max: 6}, notSunny: { min: 4, max: 6 }},
                 "environment2": {sunny: {min: 4, max: 6}, notSunny: { min: 4, max: 6 }},
                 "environment3": {sunny: {min: 5, max: 9}, notSunny: { min: 5, max: 9 }},
                 "environment4": {sunny: {min: 5, max: 9}, notSunny: { min: 5, max: 9 }} }
  },
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
  x: number,
  y: number;
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
      { environment: EnvironmentType.environment1, x: 144, y: 222, xScale: 1, yScale: 1, rotation: 0 },
      { environment: EnvironmentType.environment1, x: 50, y: 213, xScale: -.9, yScale: .9, rotation: 0 },
      { environment: EnvironmentType.environment1, x: 120, y: 150, xScale: .7, yScale: .7, rotation: 0 },
      { environment: EnvironmentType.environment1, x: 145, y: 155, xScale: .7, yScale: .7, rotation: 0 },
      { environment: EnvironmentType.environment1, x: 175, y: 150, xScale: .5, yScale: .5, rotation: 0 },

      { environment: EnvironmentType.environment2, x: 65, y: 185, xScale: -1, yScale: 1, rotation: 0 },
      { environment: EnvironmentType.environment2, x: 160, y: 155, xScale: .9, yScale: .9, rotation: 0 },
      { environment: EnvironmentType.environment2, x: 120, y: 185, xScale: .7, yScale: .7, rotation: 0 },
      { environment: EnvironmentType.environment2, x: 120, y: 185, xScale: .5, yScale: .5, rotation: 0 },
      { environment: EnvironmentType.environment2, x: 120, y: 185, xScale: .5, yScale: .5, rotation: 0 },

      { environment: EnvironmentType.environment3, x: 160, y: 185, xScale: -1, yScale: 1, rotation: 0 },
      { environment: EnvironmentType.environment3, x: 200, y: 155, xScale: .9, yScale: .9, rotation: 0 },
      { environment: EnvironmentType.environment3, x: 120, y: 185, xScale: -.7, yScale: .7, rotation: 0 },
      { environment: EnvironmentType.environment3, x: 120, y: 185, xScale: .5, yScale: .5, rotation: 0 },
      { environment: EnvironmentType.environment3, x: 120, y: 185, xScale: .5, yScale: .5, rotation: 0 },

      { environment: EnvironmentType.environment4, x: 210, y: 190, xScale: 1, yScale: 1, rotation: 0 },
      { environment: EnvironmentType.environment4, x: 160, y: 155, xScale: .9, yScale: .9, rotation: 0 },
      { environment: EnvironmentType.environment4, x: 120, y: 185, xScale: .7, yScale: .7, rotation: 0 },
      { environment: EnvironmentType.environment4, x: 120, y: 185, xScale: .5, yScale: .5, rotation: 0 },
      { environment: EnvironmentType.environment4, x: 120, y: 185, xScale: .5, yScale: .5, rotation: 0 },
    ]
  },
];

export interface SimAnimation {
  frames: any[],
  x: number;
  y: number;
  xScale: number;
  yScale: number;
  rotation: number;
}
