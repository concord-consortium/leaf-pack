import { ChemistryTest, ChemTestRatingType, ChemTestType, StepType } from "../utils/chem-types";
import t from "../utils/translation/translate";

import do_0 from "../assets/chemistry/dissolved-oxygen/do-0.svg";
import do_1A from "../assets/chemistry/dissolved-oxygen/do-1a.svg";
import do_1B from "../assets/chemistry/dissolved-oxygen/do-1b.svg";
import do_2A from "../assets/chemistry/dissolved-oxygen/do-2a.svg";
import do_2B from "../assets/chemistry/dissolved-oxygen/do-2b.svg";
import do_2C from "../assets/chemistry/dissolved-oxygen/do-2c.svg";
import do_2D from "../assets/chemistry/dissolved-oxygen/do-2d.svg";
import do_2E from "../assets/chemistry/dissolved-oxygen/do-2e.svg";
import do_2F from "../assets/chemistry/dissolved-oxygen/do-2f.svg";
import do_2G from "../assets/chemistry/dissolved-oxygen/do-2g.svg";
import do_2H from "../assets/chemistry/dissolved-oxygen/do-2h.svg";
import do_2I from "../assets/chemistry/dissolved-oxygen/do-2i.svg";
import do_2J from "../assets/chemistry/dissolved-oxygen/do-2j.svg";
import do_2K from "../assets/chemistry/dissolved-oxygen/do-2k.svg";
import do_2L from "../assets/chemistry/dissolved-oxygen/do-2l.svg";
import do_2M from "../assets/chemistry/dissolved-oxygen/do-2m.svg";
import do_2N from "../assets/chemistry/dissolved-oxygen/do-2n.svg";
import do_2O from "../assets/chemistry/dissolved-oxygen/do-2o.svg";
import do_2P_4 from "../assets/chemistry/dissolved-oxygen/do-2p-4.svg";
import do_2P_8 from "../assets/chemistry/dissolved-oxygen/do-2p-8.svg";
import do_2Q_4 from "../assets/chemistry/dissolved-oxygen/do-2q-4.svg";
import do_2Q_8 from "../assets/chemistry/dissolved-oxygen/do-2q-8.svg";
import do_2R_4 from "../assets/chemistry/dissolved-oxygen/do-2r-4.svg";
import do_2R_8 from "../assets/chemistry/dissolved-oxygen/do-2r-8.svg";
import do_2S_4 from "../assets/chemistry/dissolved-oxygen/do-2s-4.svg";
import do_2S_8 from "../assets/chemistry/dissolved-oxygen/do-2s-8.svg";
import do_2T_4 from "../assets/chemistry/dissolved-oxygen/do-2t-4.svg";
import do_2T_8 from "../assets/chemistry/dissolved-oxygen/do-2t-8.svg";
import do_3A_4 from "../assets/chemistry/dissolved-oxygen/do-3a-4.svg";
import do_3A_8 from "../assets/chemistry/dissolved-oxygen/do-3a-8.svg";
import do_3B_4 from "../assets/chemistry/dissolved-oxygen/do-3b-4.svg";
import do_3B_8 from "../assets/chemistry/dissolved-oxygen/do-3b-8.svg";

export const dissolvedOxygen: ChemistryTest = {
  type: ChemTestType.dissolvedOxygen, label: t("CHEM.OXYGEN.TEST"), units: t("CHEM.PPM.UNIT"),
  InitialImage: do_0,
  steps: [
    {type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE"),
      frames: [
        {label: "0", image: do_0, duration: 0.25},
        {label: "1a", image: do_1A, duration: 0},
        {label: "1b", image: do_1B, duration: 1}
      ]},
    {type: StepType.animation, label: t("CHEM.ADD.TABLETS"),
      frames: [
        {label: "1b", image: do_1B, duration: 0.25},
        {label: "2a", image: do_2A, duration: 0},
        {label: "2b", image: do_2B, duration: 0},
        {label: "2c", image: do_2C, duration: 0},
        {label: "2d", image: do_2D, duration: 0},
        {label: "2e", image: do_2E, duration: 1.5},
        {label: "2f", image: do_2F, duration: 0},
        {label: "2g", image: do_2G, duration: 1},
        {label: "2h", image: do_2H, duration: 2},
        {label: "2h-", image: "none", duration: 0},
        {label: "2i", image: do_2I, duration: 0},
        {label: "2j", image: do_2J, duration: 0},
        {label: "2k", image: do_2K, duration: 0},
        {label: "2l", image: do_2L, duration: 0},
        {label: "2m", image: do_2M, duration: 1},
        {label: "2m-", image: "none", duration: 0},
        {label: "2n", image: do_2N, duration: 0},
        {label: "2o", image: do_2O, duration: 0},
        {label: "2p", image: "byValue", duration: 0},
        {label: "2q", image: "byValue", duration: 0},
        {label: "2r", image: "byValue", duration: 0},
        {label: "2s", image: "byValue", duration: 0},
        {label: "2t", image: "byValue", duration: 1},
      ]},
    {type: StepType.resultSlider, label: t("CHEM.MATCH.COLOR"),
      frames: [
        {label: "2t", image: "byValue", duration: 0.25},
        {label: "2t-", image: "none", duration: 0},
        {label: "3a", image: "byValue", duration: 1},
        {label: "3b", image: "byValue", duration: 0}
      ]},
  ],
    results: [
      {value: 0, rating: ChemTestRatingType.poor, color: "#f7fdfd", borderColor: "#999999"},
      {value: 4, rating: ChemTestRatingType.fair, color: "#db9363",
        frames: {"2p": do_2P_4, "2q": do_2Q_4, "2r": do_2R_4, "2s": do_2S_4, "2t": do_2T_4, "3a": do_3A_4, "3b": do_3B_4}},
      {value: 8, rating: ChemTestRatingType.excellent, color: "#d65c2c",
        frames: {"2p": do_2P_8, "2q": do_2Q_8, "2r": do_2R_8, "2s": do_2S_8, "2t": do_2T_8, "3a": do_3A_8, "3b": do_3B_8}}
    ]
};
