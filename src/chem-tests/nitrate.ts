import { ChemistryTest, ChemTestRatingType, ChemTestType, StepType } from "../utils/chem-types";
import t from "../utils/translation/translate";

import nitrate_0 from "../assets/chemistry/nitrate/nitrate-0.svg";
import nitrate_1A from "../assets/chemistry/nitrate/nitrate-1a.svg";
import nitrate_1B from "../assets/chemistry/nitrate/nitrate-1b.svg";
import nitrate_2A from "../assets/chemistry/nitrate/nitrate-2a.svg";
import nitrate_2B from "../assets/chemistry/nitrate/nitrate-2b.svg";
import nitrate_2C from "../assets/chemistry/nitrate/nitrate-2c.svg";
import nitrate_2D from "../assets/chemistry/nitrate/nitrate-2d.svg";
import nitrate_2E from "../assets/chemistry/nitrate/nitrate-2e.svg";
import nitrate_2F from "../assets/chemistry/nitrate/nitrate-2f.svg";
import nitrate_2G from "../assets/chemistry/nitrate/nitrate-2g.svg";
import nitrate_2H from "../assets/chemistry/nitrate/nitrate-2h.svg";
import nitrate_2I from "../assets/chemistry/nitrate/nitrate-2i.svg";
import nitrate_2J from "../assets/chemistry/nitrate/nitrate-2j.svg";
import nitrate_2K from "../assets/chemistry/nitrate/nitrate-2k.svg";
import nitrate_2L from "../assets/chemistry/nitrate/nitrate-2l.svg";
import nitrate_2M from "../assets/chemistry/nitrate/nitrate-2m.svg";
import nitrate_2N from "../assets/chemistry/nitrate/nitrate-2n.svg";
import nitrate_2O from "../assets/chemistry/nitrate/nitrate-2o.svg";
import nitrate_2P from "../assets/chemistry/nitrate/nitrate-2p.svg";
import nitrate_2Q from "../assets/chemistry/nitrate/nitrate-2q.svg";
import nitrate_2R from "../assets/chemistry/nitrate/nitrate-2r.svg";
import nitrate_2S from "../assets/chemistry/nitrate/nitrate-2s.svg";
import nitrate_2T from "../assets/chemistry/nitrate/nitrate-2t.svg";
import nitrate_2U from "../assets/chemistry/nitrate/nitrate-2u.svg";
import nitrate_2V from "../assets/chemistry/nitrate/nitrate-2v.svg";
import nitrate_2W from "../assets/chemistry/nitrate/nitrate-2w.svg";
import nitrate_2X from "../assets/chemistry/nitrate/nitrate-2x.svg";
import nitrate_3A_0 from "../assets/chemistry/nitrate/nitrate-3a-0.svg";
import nitrate_3A_5 from "../assets/chemistry/nitrate/nitrate-3a-5.svg";
import nitrate_3A_20 from "../assets/chemistry/nitrate/nitrate-3a-20.svg";
import nitrate_3B_0 from "../assets/chemistry/nitrate/nitrate-3b-0.svg";
import nitrate_3B_5 from "../assets/chemistry/nitrate/nitrate-3b-5.svg";
import nitrate_3B_20 from "../assets/chemistry/nitrate/nitrate-3b-20.svg";
import nitrate_3C_0 from "../assets/chemistry/nitrate/nitrate-3c-0.svg";
import nitrate_3C_5 from "../assets/chemistry/nitrate/nitrate-3c-5.svg";
import nitrate_3C_20 from "../assets/chemistry/nitrate/nitrate-3c-20.svg";

export const nitrateTest: ChemistryTest = {
  type: ChemTestType.nitrate, label: t("CHEM.NITRATE.TEST"), units: t("CHEM.NITRATE.UNIT"),
  InitialImage: nitrate_0,
  steps: [
    {type: StepType.animation, label: t("CHEM.COLLECT.SAMPLE"),
      frames: [
        {label: "0", image: nitrate_0, duration: 0.25},
        {label: "1a", image: nitrate_1A, duration: 0},
        {label: "1b", image: nitrate_1B, duration: -1}
      ]},
    {type: StepType.animation, label: t("CHEM.ADD.TABLET"),
      frames: [
        {label: "1b", image: nitrate_1B, duration: 0.25},
        {label: "2a", image: nitrate_2A, duration: 0},
        {label: "2b", image: nitrate_2B, duration: 0},
        {label: "2c", image: nitrate_2C, duration: 0},
        {label: "2d", image: nitrate_2D, duration: 2},
        {label: "2e", image: nitrate_2E, duration: 0},
        {label: "2f", image: nitrate_2F, duration: 0},
        {label: "2g", image: nitrate_2G, duration: 0},
        {label: "2h", image: nitrate_2H, duration: 0},
        {label: "2i", image: nitrate_2I, duration: 1},
        {label: "2j", image: nitrate_2J, duration: 0},
        {label: "2k", image: nitrate_2K, duration: 1},
        {label: "2l", image: nitrate_2L, duration: 1},
        {label: "2l-", image: "none", duration: 0},
        {label: "2m", image: nitrate_2M, duration: 0},
        {label: "2n", image: nitrate_2N, duration: 0},
        {label: "2o", image: nitrate_2O, duration: 0},
        {label: "2p", image: nitrate_2P, duration: 0},
        {label: "2q", image: nitrate_2Q, duration: 1},
        {label: "2q-", image: "none", duration: 0},
        {label: "2r", image: nitrate_2R, duration: 0},
        {label: "2s", image: nitrate_2S, duration: 0},
        {label: "2t", image: nitrate_2T, duration: 0},
        {label: "2u", image: nitrate_2U, duration: 0},
        {label: "2v", image: nitrate_2V, duration: 0},
        {label: "2w", image: nitrate_2W, duration: 0},
        {label: "2x", image: nitrate_2X, duration: -1},
      ]},
    {type: StepType.resultSlider, label: t("CHEM.MATCH.COLOR"),
      frames: [
        {label: "2x", image: nitrate_2X, duration: 0.25},
        {label: "2x-", image: "none", duration: 0},
        {label: "3a", image: "byValue", duration: 1},
        {label: "3b", image: "byValue", duration: 0},
        {label: "3c", image: "byValue", duration: -1}
      ]},
  ],
  results: [
    {value: 0, rating: ChemTestRatingType.excellent, color: "#f7fdfd",
      frames: {"3a": nitrate_3A_0, "3b": nitrate_3B_0, "3c": nitrate_3C_0}},
    {value: 5, rating: ChemTestRatingType.fair, color: "#e5bd94",
      frames: {"3a": nitrate_3A_5, "3b": nitrate_3B_5, "3c": nitrate_3C_5}},
    {value: 20, rating: ChemTestRatingType.poor, color: "#dc8c74",
      frames: {"3a": nitrate_3A_20, "3b": nitrate_3B_20, "3c": nitrate_3C_20}},
    {value: 40, rating: ChemTestRatingType.poor, color: "#d24116"}
  ]
};
