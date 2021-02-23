import { ChemistryTest, ChemTestType, StepType } from "../utils/chem-types";
import t from "../utils/translation/translate";

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

export const airTemperatureTest: ChemistryTest = {
  type: ChemTestType.airTemperature, label: t("CHEM.AIRTEMP.TEST"), units: t("CHEM.TEMP.UNIT"),
  InitialImage: AirTemp0,
  steps: [
    {type: StepType.tempDisplay, label: t("CHEM.READ.THERMOMETER"),
      frames: [
        {label: "0", image: AirTemp0, duration: 0.25},
        {label: "1a", image: AirTemp1A, duration: 1},
        {label: "1b", image: AirTemp1B, duration: 2},
        {label: "1c", image: AirTemp1C, duration: 2},
        {label: "1d", image: AirTemp1D, duration: 2},
        {label: "1e", image: AirTemp1E, duration: 2},
        {label: "1f", image: AirTemp1F, duration: 2},
        {label: "1g", image: "byValue", duration: 1.5},
      ]},
  ],
  results: [
    {value: 14}, {value: 16}, {value: 18}, {value: 20},
    {value: 22, frames: {"1g": AirTemp1G_22}}, {value: 24}, {value: 26}, {value: 28},
    {value: 30, frames: {"1g": AirTemp1G_30}}, {value: 32}, {value: 34}, {value: 36},
    {value: 38, frames: {"1g": AirTemp1G_38}}, {value: 40}
  ],
};
