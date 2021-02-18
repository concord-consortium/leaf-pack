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

export interface ChemTestStep {
  label: string;
  content?: any; // TODO: what appears in the test (animation, slider, etc.)
}

export interface ChemTestValue {
  value: number;
  rating?: ChemTestRatingType;
}

export interface ChemistryTest {
  type: ChemTestType,
  label: string,
  steps: ChemTestStep[],
  values: ChemTestValue[],
  units: string,
}

export const chemistryTests: ChemistryTest[] = [
  { type: ChemTestType.airTemperature, label: t("CHEM.AIRTEMP.TEST"), units: t("CHEM.TEMP.UNIT"),
    steps: [{label: t("CHEM.READ.THERMOMETER")}],
    values: [{value: 14}, {value: 16}, {value: 18}, {value: 20}, {value: 22}, {value: 24}, {value: 26}, {value: 28},
             {value: 30}, {value: 32}, {value: 34}, {value: 36}, {value: 38}, {value: 40}],
  },
  { type: ChemTestType.waterTemperature, label: t("CHEM.WATERTEMP.TEST"), units: t("CHEM.TEMP.UNIT"),
    steps: [{label: t("CHEM.COLLECT.SAMPLE")}, {label: t("CHEM.READ.THERMOMETER")}],
    values: [{value: 14}, {value: 16}, {value: 18}, {value: 20}, {value: 22}, {value: 24}, {value: 26}, {value: 28},
             {value: 30}, {value: 32}, {value: 34}, {value: 36}, {value: 38}, {value: 40}]
  },
  { type: ChemTestType.pH, label: t("CHEM.PH.TEST"), units: t("CHEM.PH.UNIT"),
    steps: [{label: t("CHEM.COLLECT.SAMPLE")}, {label: t("CHEM.ADD.TABLET")}, {label: t("CHEM.MATCH.COLOR")}],
    values: [{value: 4, rating: ChemTestRatingType.poor}, {value: 5, rating: ChemTestRatingType.poor},
             {value: 6, rating: ChemTestRatingType.good}, {value: 7, rating: ChemTestRatingType.excellent},
             {value: 8, rating: ChemTestRatingType.good}, {value: 9, rating: ChemTestRatingType.poor},
             {value: 10, rating: ChemTestRatingType.poor}]
  },
  { type: ChemTestType.nitrate, label: t("CHEM.NITRATE.TEST"), units: t("CHEM.AIR.UNIT"),
    steps: [{label: t("CHEM.COLLECT.SAMPLE")}, {label: t("CHEM.ADD.TABLET")}, {label: t("CHEM.MATCH.COLOR")}],
    values: [{value: 0, rating: ChemTestRatingType.excellent}, {value: 5, rating: ChemTestRatingType.fair},
             {value: 20, rating: ChemTestRatingType.poor}, {value: 40, rating: ChemTestRatingType.poor}]
  },
  { type: ChemTestType.turbidity, label: t("CHEM.TURBIDITY.TEST"), units: t("CHEM.TURBIDITY.UNIT"),
    steps: [{label: t("CHEM.COLLECT.SAMPLE")}, {label: t("CHEM.MATCH.VALUE")}],
    values: [{value: 0, rating: ChemTestRatingType.excellent}, {value: 40, rating: ChemTestRatingType.good},
             {value: 100, rating: ChemTestRatingType.fair}]
  },
  { type: ChemTestType.dissolvedOxygen, label: t("CHEM.OXYGEN.TEST"), units: t("CHEM.AIR.UNIT"),
    steps: [{label: t("CHEM.COLLECT.SAMPLE")}, {label: t("CHEM.ADD.TABLETS")}, {label: t("CHEM.MATCH.COLOR")}],
    values: [{value: 0, rating: ChemTestRatingType.poor}, {value: 4, rating: ChemTestRatingType.fair},
             {value: 8, rating: ChemTestRatingType.excellent}]
  },
];

export interface ChemistryTestResult {
  type: ChemTestType,
  stepsComplete: number,
  value: number
}
