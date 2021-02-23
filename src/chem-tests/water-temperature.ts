import { ChemistryTest, ChemTestType, StepType } from "../utils/chem-types";
import t from "../utils/translation/translate";

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

export const waterTemperatureTest: ChemistryTest = {
  type: ChemTestType.waterTemperature, label: t("CHEM.WATERTEMP.TEST"), units: t("CHEM.TEMP.UNIT"),
  InitialImage: WaterTemp0,
  steps: [
    {type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE"),
      frames: [
        {label: "0", image: WaterTemp0, duration: 0.25},
        {label: "1a", image: WaterTemp1A, duration: 1},
        {label: "1b", image: WaterTemp1B, duration: 1.5},
        {label: "1c", image: WaterTemp1C, duration: 1.5},
      ]},
    {type: StepType.tempDisplay, label: t("CHEM.READ.THERMOMETER"),
      frames: [
        {label: "1c", image: WaterTemp1C, duration: 0.25},
        {label: "2a", image: WaterTemp2A, duration: 0},
        {label: "2b", image: WaterTemp2B, duration: 2},
        {label: "2c", image: WaterTemp2C, duration: 0},
        {label: "2d", image: WaterTemp2D, duration: 1.5},
        {label: "2e", image: WaterTemp2E, duration: 2},
        {label: "2e-", image: "none", duration: 0},
        {label: "2f", image: WaterTemp2F, duration: 1},
        {label: "2g", image: "byValue", duration: 1.5}
      ]}
  ],
  results: [
    {value: 10}, {value: 12, frames: {"2g": WaterTemp2G_12}}, {value: 14}, {value: 16},
    {value: 18}, {value: 20}, {value: 22, frames: {"2g": WaterTemp2G_22}},
    {value: 24, frames: {"2g": WaterTemp2G_24}}, {value: 26}, {value: 28}, {value: 30},
    {value: 32}, {value: 34}, {value: 36}, {value: 38}, {value: 40}
  ]
};
