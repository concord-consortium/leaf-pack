import {
  ChemistryTest, ChemistryValues, ChemTestRating, ChemTestRatingType, ChemTestType, StepType
} from "./chem-types";
import { EnvironmentType } from "./environment";
import t from "./translation/translate";

import { airTemperatureTest } from "../chem-tests/air-temperature";
import { nitrateTest } from "../chem-tests/nitrate";
import { phTest } from "../chem-tests/ph";
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
  phTest,
  nitrateTest,
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
