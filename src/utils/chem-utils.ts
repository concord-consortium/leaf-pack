import Turbidity0 from "../assets/disk-0.svg";
import Turbidity40 from "../assets/disk-40.svg";
import Turbidity100 from "../assets/disk-100.svg";
import t from "./translation/translate";

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

export interface ChemTestStep {
  type: StepType;
  label: string;
  content?: any; // TODO: what appears in the test (animation, slider, etc.)
}

export interface ChemTestValue {
  value: number;
  rating?: ChemTestRatingType;
  color?: string;
  icon?: any;
}

export interface ChemistryTest {
  type: ChemTestType,
  label: string,
  steps: ChemTestStep[],
  results: ChemTestValue[],
  units: string,
}

export const chemistryTests: ChemistryTest[] = [
  { type: ChemTestType.airTemperature, label: t("CHEM.AIRTEMP.TEST"), units: t("CHEM.TEMP.UNIT"),
    steps: [{type: StepType.tempDisplay, label: t("CHEM.READ.THERMOMETER")}],
    results: [{value: 14}, {value: 16}, {value: 18}, {value: 20}, {value: 22}, {value: 24}, {value: 26}, {value: 28},
             {value: 30}, {value: 32}, {value: 34}, {value: 36}, {value: 38}, {value: 40}],
  },
  { type: ChemTestType.waterTemperature, label: t("CHEM.WATERTEMP.TEST"), units: t("CHEM.TEMP.UNIT"),
    steps: [{type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE")},
            {type: StepType.tempDisplay, label: t("CHEM.READ.THERMOMETER")}],
            results: [{value: 14}, {value: 16}, {value: 18}, {value: 20}, {value: 22}, {value: 24}, {value: 26}, {value: 28},
             {value: 30}, {value: 32}, {value: 34}, {value: 36}, {value: 38}, {value: 40}]
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
    steps: [{type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE")}, {type: StepType.resultSlider, label: t("CHEM.MATCH.VALUE")}],
    results: [{value: 0, rating: ChemTestRatingType.excellent, icon: Turbidity0}, {value: 40, rating: ChemTestRatingType.good, icon: Turbidity40},
             {value: 100, rating: ChemTestRatingType.fair, icon: Turbidity100}]
  },
  { type: ChemTestType.dissolvedOxygen, label: t("CHEM.OXYGEN.TEST"), units: t("CHEM.AIR.UNIT"),
    steps: [{type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE")}, {type: StepType.animation, label: t("CHEM.ADD.TABLETS")},
            {type: StepType.resultSlider, label: t("CHEM.MATCH.COLOR")}],
    results: [{value: 0, rating: ChemTestRatingType.poor, color: "#f7fdfd"}, {value: 4, rating: ChemTestRatingType.fair, color: "#db9363"},
             {value: 8, rating: ChemTestRatingType.excellent, color: "#d65c2c"}]
  },
];

export interface ChemistryTestResult {
  type: ChemTestType,
  stepsComplete: number,
  value: number
}
