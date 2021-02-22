import { ChemistryTest, ChemTestRatingType, ChemTestType, StepType } from "../utils/chem-types";
import t from "../utils/translation/translate";

import pH_0 from "../assets/chemistry/ph/ph-0.svg";
import pH_1A from "../assets/chemistry/ph/ph-1a.svg";
import pH_1B from "../assets/chemistry/ph/ph-1b.svg";
import pH_2A from "../assets/chemistry/ph/ph-2a.svg";
import pH_2B from "../assets/chemistry/ph/ph-2b.svg";
import pH_2C from "../assets/chemistry/ph/ph-2c.svg";
import pH_2D from "../assets/chemistry/ph/ph-2d.svg";
import pH_2E from "../assets/chemistry/ph/ph-2e.svg";
import pH_2F from "../assets/chemistry/ph/ph-2f.svg";
import pH_2G_5 from "../assets/chemistry/ph/ph-2g-5.svg";
import pH_2G_6 from "../assets/chemistry/ph/ph-2g-6.svg";
import pH_2G_7 from "../assets/chemistry/ph/ph-2g-7.svg";
import pH_2G_9 from "../assets/chemistry/ph/ph-2g-9.svg";
import pH_2H_5 from "../assets/chemistry/ph/ph-2h-5.svg";
import pH_2H_6 from "../assets/chemistry/ph/ph-2h-6.svg";
import pH_2H_7 from "../assets/chemistry/ph/ph-2h-7.svg";
import pH_2H_9 from "../assets/chemistry/ph/ph-2h-9.svg";
import pH_2I_5 from "../assets/chemistry/ph/ph-2i-5.svg";
import pH_2I_6 from "../assets/chemistry/ph/ph-2i-6.svg";
import pH_2I_7 from "../assets/chemistry/ph/ph-2i-7.svg";
import pH_2I_9 from "../assets/chemistry/ph/ph-2i-9.svg";
import pH_2J_5 from "../assets/chemistry/ph/ph-2j-5.svg";
import pH_2J_6 from "../assets/chemistry/ph/ph-2j-6.svg";
import pH_2J_7 from "../assets/chemistry/ph/ph-2j-7.svg";
import pH_2J_9 from "../assets/chemistry/ph/ph-2j-9.svg";
import pH_2K_5 from "../assets/chemistry/ph/ph-2k-5.svg";
import pH_2K_6 from "../assets/chemistry/ph/ph-2k-6.svg";
import pH_2K_7 from "../assets/chemistry/ph/ph-2k-7.svg";
import pH_2K_9 from "../assets/chemistry/ph/ph-2k-9.svg";
import pH_3A_5 from "../assets/chemistry/ph/ph-3a-5.svg";
import pH_3A_6 from "../assets/chemistry/ph/ph-3a-6.svg";
import pH_3A_7 from "../assets/chemistry/ph/ph-3a-7.svg";
import pH_3A_9 from "../assets/chemistry/ph/ph-3a-9.svg";
import pH_3B_5 from "../assets/chemistry/ph/ph-3b-5.svg";
import pH_3B_6 from "../assets/chemistry/ph/ph-3b-6.svg";
import pH_3B_7 from "../assets/chemistry/ph/ph-3b-7.svg";
import pH_3B_9 from "../assets/chemistry/ph/ph-3b-9.svg";

export const phTest: ChemistryTest = {
  type: ChemTestType.pH, label: t("CHEM.PH.TEST"), units: t("CHEM.PH.UNIT"),
  InitialImage: pH_0,
  steps: [
    {type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE"),
      frames: [
        {label: "0", image: pH_0, duration: 0.25},
        {label: "1a", image: pH_1A, duration: 0},
        {label: "1b", image: pH_1B, duration: -1}
      ]},
    {type: StepType.animation, label: t("CHEM.ADD.TABLET"),
      frames: [
        {label: "1b", image: pH_1B, duration: 0.25},
        {label: "2a", image: pH_2A, duration: 0},
        {label: "2b", image: pH_2B, duration: 0},
        {label: "2c", image: pH_2C, duration: 0},
        {label: "2d", image: pH_2D, duration: 2},
        {label: "2e", image: pH_2E, duration: 0},
        {label: "2f", image: pH_2F, duration: 1.5},
        {label: "2f-", image: "none", duration: 0},
        {label: "2g", image: "byValue", duration: 0},
        {label: "2h", image: "byValue", duration: 0},
        {label: "2i", image: "byValue", duration: 0},
        {label: "2j", image: "byValue", duration: 0},
        {label: "2k", image: "byValue", duration: -1},
      ]},
    {type: StepType.resultSlider, label: t("CHEM.MATCH.COLOR"),
      frames: [
        {label: "2k", image: "byValue", duration: 0.25},
        {label: "2k-", image: "none", duration: 0},
        {label: "3a", image: "byValue", duration: 0},
        {label: "3b", image: "byValue", duration: -1}
      ]},
  ],
  results: [
    {value: 4, rating: ChemTestRatingType.poor, color: "#e16f4e"},
    {value: 5, rating: ChemTestRatingType.poor, color: "#f0895b",
      frames: {"2g": pH_2G_5, "2h": pH_2H_5, "2i": pH_2I_5, "2j": pH_2J_5, "2k": pH_2K_5, "3a": pH_3A_5, "3b": pH_3B_5} },
    {value: 6, rating: ChemTestRatingType.good, color: "#f6c842",
      frames: {"2g": pH_2G_6, "2h": pH_2H_6, "2i": pH_2I_6, "2j": pH_2J_6, "2k": pH_2K_6, "3a": pH_3A_6, "3b": pH_3B_6} },
    {value: 7, rating: ChemTestRatingType.excellent, color: "#cad04c",
      frames: {"2g": pH_2G_7, "2h": pH_2H_7, "2i": pH_2I_7, "2j": pH_2J_7, "2k": pH_2K_7, "3a": pH_3A_7, "3b": pH_3B_7} },
    {value: 8, rating: ChemTestRatingType.good, color: "#9fc051"},
    {value: 9, rating: ChemTestRatingType.poor, color: "#767a76",
      frames: {"2g": pH_2G_9, "2h": pH_2H_9, "2i": pH_2I_9, "2j": pH_2J_9, "2k": pH_2K_9, "3a": pH_3A_9, "3b": pH_3B_9} },
    {value: 10, rating: ChemTestRatingType.poor, color: "#713357"}
  ]
};
