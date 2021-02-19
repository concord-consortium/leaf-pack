import React from "react";
import IconPTI from "../../assets/pti-icon.svg";
import { getPTIRatingIndex, PTIRatingLevels } from "../../utils/macro-utils";

import "./stream-score.scss";

interface IProps {
  ptiScore?: number;
}
export const StreamScore: React.FC<IProps> = ({ ptiScore }) => {
  const score = ptiScore ?? 0;
  // add an extra space for single digit scores
  const ptiScoreStr = `PTI:\u00a0${score < 10 ? "\u00a0" : ""}${ptiScore ?? ""}`;
  const ptiIndex = getPTIRatingIndex(score);
  const ptiLevel = PTIRatingLevels[ptiIndex];
  const style: React.CSSProperties = {
          backgroundColor: score > 0 ? ptiLevel.color : "white"
        };
  const ptiRating = score > 0 ? ptiLevel.label : "";
  return (
    <div className="stream-score" style={style}>
      <IconPTI />
      <div className="pti-results">
        <label className="pti-score">{ptiScoreStr}</label>
        <label className="pti-rating">{ptiRating}</label>
      </div>
    </div>
  );
};
