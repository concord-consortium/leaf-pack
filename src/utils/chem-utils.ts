import {
  ChemistryTest, ChemistryValues, ChemTestRating, ChemTestRatingType, ChemTestType, StepType
} from "./chem-types";
import { EnvironmentType } from "./environment";
import t from "./translation/translate";

import { airTemperatureTest } from "../chem-tests/air-temperature";
import { turbidityTest } from "../chem-tests/turbidity";
import { waterTemperatureTest } from "../chem-tests/water-temperature";

export const chemTestRatings: ChemTestRating[] = [
  {type: ChemTestRatingType.excellent, label: t("CHEM.EXCELLENT"), color: "#a4f9be"},
  {type: ChemTestRatingType.good, label: t("CHEM.GOOD"), color: "#94e5ff"},
  {type: ChemTestRatingType.fair, label: t("CHEM.FAIR"), color: "#cccccc"},
  {type: ChemTestRatingType.poor, label: t("CHEM.POOR"), color: "#ffacac"},
];

export const chemistryTests: ChemistryTest[] = [
  airTemperatureTest,
  waterTemperatureTest,
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
  turbidityTest,
  { type: ChemTestType.dissolvedOxygen, label: t("CHEM.OXYGEN.TEST"), units: t("CHEM.AIR.UNIT"),
    steps: [{type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE")}, {type: StepType.animation, label: t("CHEM.ADD.TABLETS")},
            {type: StepType.resultSlider, label: t("CHEM.MATCH.COLOR")}],
    results: [{value: 0, rating: ChemTestRatingType.poor, color: "#f7fdfd"}, {value: 4, rating: ChemTestRatingType.fair, color: "#db9363"},
             {value: 8, rating: ChemTestRatingType.excellent, color: "#d65c2c"}]
  },
];

export const chemistryFinalValues: Record<EnvironmentType, ChemistryValues> = {
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
