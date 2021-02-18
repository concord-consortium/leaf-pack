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
  {type: ChemTestRatingType.excellent, label: "Excellent", color: "#a4f9be"},
  {type: ChemTestRatingType.good, label: "Good", color: "#94e5ff"},
  {type: ChemTestRatingType.fair, label: "Fair", color: "#cccccc"},
  {type: ChemTestRatingType.poor, label: "Poor", color: "#ffacac"},
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
  { type: ChemTestType.airTemperature, label: "Air Temperature", units: "°C",
    steps: [{label: "Read thermometer"}],
    values: [{value: 14}, {value: 16}, {value: 18}, {value: 20}, {value: 22}, {value: 24}, {value: 26}, {value: 28},
             {value: 30}, {value: 32}, {value: 34}, {value: 36}, {value: 38}, {value: 40}],
  },
  { type: ChemTestType.waterTemperature, label: "Water Temperature", units: "°C",
    steps: [{label: "Collect sample"}, {label: "Read thermometer"}],
    values: [{value: 14}, {value: 16}, {value: 18}, {value: 20}, {value: 22}, {value: 24}, {value: 26}, {value: 28},
             {value: 30}, {value: 32}, {value: 34}, {value: 36}, {value: 38}, {value: 40}]
  },
  { type: ChemTestType.pH, label: "pH", units: "pH",
    steps: [{label: "Collect sample"}, {label: "Add test tablet"}, {label: "Match color"}],
    values: [{value: 4, rating: ChemTestRatingType.poor}, {value: 5, rating: ChemTestRatingType.poor},
             {value: 6, rating: ChemTestRatingType.good}, {value: 7, rating: ChemTestRatingType.excellent},
             {value: 8, rating: ChemTestRatingType.good}, {value: 9, rating: ChemTestRatingType.poor},
             {value: 10, rating: ChemTestRatingType.poor}]
  },
  { type: ChemTestType.nitrate, label: "Nitrate", units: "ppm",
    steps: [{label: "Collect sample"}, {label: "Add test tablet"}, {label: "Match color"}],
    values: [{value: 0, rating: ChemTestRatingType.excellent}, {value: 5, rating: ChemTestRatingType.fair},
             {value: 20, rating: ChemTestRatingType.poor}, {value: 40, rating: ChemTestRatingType.poor}]
  },
  { type: ChemTestType.turbidity, label: "Turbidity", units: "JTU",
    steps: [{label: "Collect sample"}, {label: "Match value"}],
    values: [{value: 0, rating: ChemTestRatingType.excellent}, {value: 40, rating: ChemTestRatingType.good},
             {value: 100, rating: ChemTestRatingType.fair}]
  },
  { type: ChemTestType.dissolvedOxygen, label: "Dissolved Oxygen", units: "ppm",
    steps: [{label: "Collect sample"}, {label: "Add test tablets"}, {label: "Match color"}],
    values: [{value: 0, rating: ChemTestRatingType.poor}, {value: 4, rating: ChemTestRatingType.fair},
             {value: 8, rating: ChemTestRatingType.excellent}]
  },
];

export interface ChemistryTestResult {
  type: ChemTestType,
  stepsComplete: number,
  value: number
}