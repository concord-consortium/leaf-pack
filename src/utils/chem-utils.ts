import { SVGProps } from "react";
import { EnvironmentType } from "./environment";
import t from "./translation/translate";

import AirTemp0 from "../assets/chemistry/air-temperature/air-temp-0.svg";
import AirTemp1A from "../assets/chemistry/air-temperature/air-temp-1a.svg";
import AirTemp1B from "../assets/chemistry/air-temperature/air-temp-1b.svg";
import AirTemp1C from "../assets/chemistry/air-temperature/air-temp-1c.svg";
import AirTemp1D from "../assets/chemistry/air-temperature/air-temp-1d.svg";
import AirTemp1E from "../assets/chemistry/air-temperature/air-temp-1e.svg";
import AirTemp1F from "../assets/chemistry/air-temperature/air-temp-1f.svg";
import AirTemp1G_22 from "../assets/chemistry/air-temperature/air-temp-1g-22.svg";
import AirTemp1G_30 from "../assets/chemistry/air-temperature/air-temp-1g-30.svg";
import AirTemp1G_38 from "../assets/chemistry/air-temperature/air-temp-1g-38.svg";
import Turbidity0 from "../assets/chemistry/turbidity/turbidity-0.svg";
import Turbidity1A from "../assets/chemistry/turbidity/turbidity-1a.svg";
import Turbidity1B from "../assets/chemistry/turbidity/turbidity-1b.svg";
import Turbidity1C from "../assets/chemistry/turbidity/turbidity-1c.svg";
import Turbidity1D from "../assets/chemistry/turbidity/turbidity-1d.svg";
import Turbidity1E_0 from "../assets/chemistry/turbidity/turbidity-1e-0.svg";
import Turbidity1E_40 from "../assets/chemistry/turbidity/turbidity-1e-40.svg";
import Turbidity1E_100 from "../assets/chemistry/turbidity/turbidity-1e-100.svg";
import Turbidity1F_0 from "../assets/chemistry/turbidity/turbidity-1f-0.svg";
import Turbidity1F_40 from "../assets/chemistry/turbidity/turbidity-1f-40.svg";
import Turbidity1F_100 from "../assets/chemistry/turbidity/turbidity-1f-100.svg";
import Turbidity2A_0 from "../assets/chemistry/turbidity/turbidity-2a-0.svg";
import Turbidity2A_40 from "../assets/chemistry/turbidity/turbidity-2a-40.svg";
import Turbidity2A_100 from "../assets/chemistry/turbidity/turbidity-2a-100.svg";
import Turbidity2B_0 from "../assets/chemistry/turbidity/turbidity-2b-0.svg";
import Turbidity2B_40 from "../assets/chemistry/turbidity/turbidity-2b-40.svg";
import Turbidity2B_100 from "../assets/chemistry/turbidity/turbidity-2b-100.svg";
import Turbidity0Disk from "../assets/disk-0.svg";
import Turbidity40Disk from "../assets/disk-40.svg";
import Turbidity100Disk from "../assets/disk-100.svg";
import WaterTemp0 from "../assets/chemistry/water-temperature/water-temp-0.svg";
import WaterTemp1A from "../assets/chemistry/water-temperature/water-temp-1a.svg";
import WaterTemp1B from "../assets/chemistry/water-temperature/water-temp-1b.svg";
import WaterTemp1C from "../assets/chemistry/water-temperature/water-temp-1c.svg";
import WaterTemp2A from "../assets/chemistry/water-temperature/water-temp-2a.svg";
import WaterTemp2B from "../assets/chemistry/water-temperature/water-temp-2b.svg";
import WaterTemp2C from "../assets/chemistry/water-temperature/water-temp-2c.svg";
import WaterTemp2D from "../assets/chemistry/water-temperature/water-temp-2d.svg";
import WaterTemp2E from "../assets/chemistry/water-temperature/water-temp-2e.svg";
import WaterTemp2F from "../assets/chemistry/water-temperature/water-temp-2f.svg";
import WaterTemp2G_12 from "../assets/chemistry/water-temperature/water-temp-2g-12.svg";
import WaterTemp2G_22 from "../assets/chemistry/water-temperature/water-temp-2g-22.svg";
import WaterTemp2G_24 from "../assets/chemistry/water-temperature/water-temp-2g-24.svg";

export enum ChemTestType {
  airTemperature = "airTemperature",
  waterTemperature = "waterTemperature",
  pH = "pH",
  nitrate = "nitrate",
  turbidity = "turbidity",
  dissolvedOxygen= "dissolvedOxygen",
}

export enum ChemTestRatingType {
  excellent = "excellent",
  good = "good",
  fair = "fair",
  poor = "poor",
}

export interface ChemTestRating {
  type: ChemTestRatingType;
  label: string;
  color: string;
}
export const chemTestRatings: ChemTestRating[] = [
  {type: ChemTestRatingType.excellent, label: t("CHEM.EXCELLENT"), color: "#a4f9be"},
  {type: ChemTestRatingType.good, label: t("CHEM.GOOD"), color: "#94e5ff"},
  {type: ChemTestRatingType.fair, label: t("CHEM.FAIR"), color: "#cccccc"},
  {type: ChemTestRatingType.poor, label: t("CHEM.POOR"), color: "#ffacac"},
];

export enum StepType {
  animation = "animation",
  resultSlider = "resultSlider",
  tempDisplay = "tempDisplay",
}

export function lookupByValue(label: string, value: number, results: ChemTestValue[]) {
  return results.find(result => result.value === value)?.frames?.[label];
}

export interface ChemTestAnimationFrame {
  label: string;
  image: "none" | "byValue" | React.FC<SVGProps<SVGSVGElement>>;
  duration: number;
}

export interface ChemTestStep {
  type: StepType;
  label: string;
  frames?: ChemTestAnimationFrame[];
  // string => animation frame reference
  Image?: string | React.FC<SVGProps<SVGSVGElement>>;  // in lieu of animation
}

export interface ChemTestValue {
  value: number;
  rating?: ChemTestRatingType;
  color?: string;
  Icon?: React.FC<SVGProps<SVGSVGElement>>;
  frames?: Record<string, React.FC<SVGProps<SVGSVGElement>>>
}

export interface ChemistryTest {
  type: ChemTestType,
  label: string,
  InitialImage?: React.FC<SVGProps<SVGSVGElement>>;
  steps: ChemTestStep[],
  results: ChemTestValue[],
  units: string,
}

export const chemistryTests: ChemistryTest[] = [
  { type: ChemTestType.airTemperature, label: t("CHEM.AIRTEMP.TEST"), units: t("CHEM.TEMP.UNIT"),
    InitialImage: AirTemp0,
    steps: [
      {type: StepType.tempDisplay, label: t("CHEM.READ.THERMOMETER"), Image: "1g",
        frames: [
          {label: "0", image: AirTemp0, duration: 0.25},
          {label: "1a", image: AirTemp1A, duration: 1},
          {label: "1b", image: AirTemp1B, duration: 2},
          {label: "1c", image: AirTemp1C, duration: 2},
          {label: "1d", image: AirTemp1D, duration: 2},
          {label: "1e", image: AirTemp1E, duration: 2},
          {label: "1f", image: AirTemp1F, duration: 2},
          {label: "1g", image: "byValue", duration: -1},
        ]},
    ],
    results: [
      {value: 14}, {value: 16}, {value: 18}, {value: 20},
      {value: 22, frames: {"1g": AirTemp1G_22}}, {value: 24}, {value: 26}, {value: 28},
      {value: 30, frames: {"1g": AirTemp1G_30}}, {value: 32}, {value: 34}, {value: 36},
      {value: 38, frames: {"1g": AirTemp1G_38}}, {value: 40}
    ],
  },
  { type: ChemTestType.waterTemperature, label: t("CHEM.WATERTEMP.TEST"), units: t("CHEM.TEMP.UNIT"),
    InitialImage: WaterTemp0,
    steps: [
      {type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE"), Image: WaterTemp1C,
        frames: [
          {label: "0", image: WaterTemp0, duration: 0.25},
          {label: "1a", image: WaterTemp1A, duration: 1},
          {label: "1b", image: WaterTemp1B, duration: 1.5},
          {label: "1c", image: WaterTemp1C, duration: -1},
        ]},
      {type: StepType.tempDisplay, label: t("CHEM.READ.THERMOMETER"), Image: "2g",
        frames: [
          {label: "1c", image: WaterTemp1C, duration: 0.25},
          {label: "2a", image: WaterTemp2A, duration: 0},
          {label: "2b", image: WaterTemp2B, duration: 2},
          {label: "2c", image: WaterTemp2C, duration: 0},
          {label: "2d", image: WaterTemp2D, duration: 1.5},
          {label: "2e", image: WaterTemp2E, duration: 2},
          {label: "2e-", image: "none", duration: 0},
          {label: "2f", image: WaterTemp2F, duration: 1},
          {label: "2g", image: "byValue", duration: -1}
        ]}
    ],
    results: [
      {value: 10}, {value: 12, frames: {"2g": WaterTemp2G_12}}, {value: 14}, {value: 16},
      {value: 18}, {value: 20}, {value: 22, frames: {"2g": WaterTemp2G_22}},
      {value: 24, frames: {"2g": WaterTemp2G_24}}, {value: 26}, {value: 28}, {value: 30},
      {value: 32}, {value: 34}, {value: 36}, {value: 38}, {value: 40}
    ]
  },
  { type: ChemTestType.pH, label: t("CHEM.PH.TEST"), units: t("CHEM.PH.UNIT"),
    steps: [{type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE")}, {type: StepType.animation, label: t("CHEM.ADD.TABLET")},
            {type: StepType.resultSlider, label: t("CHEM.MATCH.COLOR")}],
    results: [{value: 4, rating: ChemTestRatingType.poor, color: "#e16f4e"}, {value: 5, rating: ChemTestRatingType.poor, color: "#f0895b"},
             {value: 6, rating: ChemTestRatingType.good, color: "#f6c842"}, {value: 7, rating: ChemTestRatingType.excellent, color: "#cad04c"},
             {value: 8, rating: ChemTestRatingType.good, color: "#9fc051"}, {value: 9, rating: ChemTestRatingType.poor, color: "#767a76"},
             {value: 10, rating: ChemTestRatingType.poor, color: "#713357"}]
  },
  { type: ChemTestType.nitrate, label: t("CHEM.NITRATE.TEST"), units: t("CHEM.AIR.UNIT"),
    steps: [{type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE")}, {type: StepType.animation, label: t("CHEM.ADD.TABLET")},
            {type: StepType.resultSlider, label: t("CHEM.MATCH.COLOR")}],
    results: [{value: 0, rating: ChemTestRatingType.excellent, color: "#f7fdfd"}, {value: 5, rating: ChemTestRatingType.fair, color: "#e5bd94"},
             {value: 20, rating: ChemTestRatingType.poor, color: "#dc8c74"}, {value: 40, rating: ChemTestRatingType.poor, color: "#d24116"}]
  },
  { type: ChemTestType.turbidity, label: t("CHEM.TURBIDITY.TEST"), units: t("CHEM.TURBIDITY.UNIT"),
    InitialImage: Turbidity0,
    steps: [
      {type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE"), Image: "1f",
        frames: [
          {label: "0", image: Turbidity0, duration: 0.25},
          {label: "1a", image: Turbidity1A, duration: 1},
          {label: "1b", image: Turbidity1B, duration: 2},
          {label: "1c", image: Turbidity1C, duration: 0},
          {label: "1d", image: Turbidity1D, duration: 2},
          {label: "1d-", image: "none", duration: 0},
          {label: "1e", image: "byValue", duration: 1},
          {label: "1f", image: "byValue", duration: -1},
        ]},
      {type: StepType.resultSlider, label: t("CHEM.MATCH.VALUE"), Image: "2b",
        frames: [
          {label: "1f", image: "byValue", duration: 0.25},
          {label: "2a", image: "byValue", duration: 0},
          {label: "2b", image: "byValue", duration: -1}
        ]}
    ],
    results: [
      {value: 0, rating: ChemTestRatingType.excellent, Icon: Turbidity0Disk,
        frames: { "1e": Turbidity1E_0, "1f": Turbidity1F_0, "2a": Turbidity2A_0, "2b": Turbidity2B_0}},
      {value: 40, rating: ChemTestRatingType.good, Icon: Turbidity40Disk,
        frames: { "1e": Turbidity1E_40, "1f": Turbidity1F_40, "2a": Turbidity2A_40, "2b": Turbidity2B_40}},
      {value: 100, rating: ChemTestRatingType.fair, Icon: Turbidity100Disk,
        frames: { "1e": Turbidity1E_100, "1f": Turbidity1F_100, "2a": Turbidity2A_100, "2b": Turbidity2B_100}}
    ]
  },
  { type: ChemTestType.dissolvedOxygen, label: t("CHEM.OXYGEN.TEST"), units: t("CHEM.AIR.UNIT"),
    steps: [{type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE")}, {type: StepType.animation, label: t("CHEM.ADD.TABLETS")},
            {type: StepType.resultSlider, label: t("CHEM.MATCH.COLOR")}],
    results: [{value: 0, rating: ChemTestRatingType.poor, color: "#f7fdfd"}, {value: 4, rating: ChemTestRatingType.fair, color: "#db9363"},
             {value: 8, rating: ChemTestRatingType.excellent, color: "#d65c2c"}]
  },
];

export type ChemistryValues = Record<ChemTestType, number>;
export const ChemistryFinalValues: Record<EnvironmentType, ChemistryValues> = {
  [EnvironmentType.environment1]: {
    [ChemTestType.airTemperature]: 22,
    [ChemTestType.waterTemperature]: 12,
    [ChemTestType.pH]: 7,
    [ChemTestType.nitrate]: 0,
    [ChemTestType.turbidity]: 0,
    [ChemTestType.dissolvedOxygen]: 8
  },
  [EnvironmentType.environment2]: {
    [ChemTestType.airTemperature]: 22,
    [ChemTestType.waterTemperature]: 12,
    [ChemTestType.pH]: 6,
    [ChemTestType.nitrate]: 0,
    [ChemTestType.turbidity]: 0,
    [ChemTestType.dissolvedOxygen]: 8
  },
  [EnvironmentType.environment3]: {
    [ChemTestType.airTemperature]: 30,
    [ChemTestType.waterTemperature]: 22,
    [ChemTestType.pH]: 5,
    [ChemTestType.nitrate]: 5,
    [ChemTestType.turbidity]: 40,
    [ChemTestType.dissolvedOxygen]: 4
  },
  [EnvironmentType.environment4]: {
    [ChemTestType.airTemperature]: 38,
    [ChemTestType.waterTemperature]: 24,
    [ChemTestType.pH]: 9,
    [ChemTestType.nitrate]: 20,
    [ChemTestType.turbidity]: 100,
    [ChemTestType.dissolvedOxygen]: 4
  }
};

export interface ChemistryTestResult {
  type: ChemTestType,
  stepsComplete: number,
  value: number
}
