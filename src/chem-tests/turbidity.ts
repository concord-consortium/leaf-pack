import { ChemistryTest, ChemTestRatingType, ChemTestType, StepType } from "../utils/chem-types";
import t from "../utils/translation/translate";

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

export const turbidityTest: ChemistryTest = {
  type: ChemTestType.turbidity, label: t("CHEM.TURBIDITY.TEST"), units: t("CHEM.TURBIDITY.UNIT"),
  InitialImage: Turbidity0,
  steps: [
    {type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE"),
      frames: [
        {label: "0", image: Turbidity0, duration: 0.25},
        {label: "1a", image: Turbidity1A, duration: 1},
        {label: "1b", image: Turbidity1B, duration: 2},
        {label: "1c", image: Turbidity1C, duration: 0},
        {label: "1d", image: Turbidity1D, duration: 2},
        {label: "1d-", image: "none", duration: 0},
        {label: "1e", image: "byValue", duration: 1},
        {label: "1f", image: "byValue", duration: 1.5},
      ]},
    {type: StepType.resultSlider, label: t("CHEM.MATCH.VALUE"),
      frames: [
        {label: "1f", image: "byValue", duration: 0.25},
        {label: "2a", image: "byValue", duration: 0},
        {label: "2b", image: "byValue", duration: 0}
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
};
