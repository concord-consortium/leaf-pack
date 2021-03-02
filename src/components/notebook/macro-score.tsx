import React from "react";
import t from "../../utils/translation/translate";
import { PTIRatingLevels } from "../../utils/macro-utils";

import "./macro-score.scss";

interface IProps {
  score: number;
  ratingIndex: number;
}

export const MacroScore: React.FC<IProps> = (props) => {
  const { score, ratingIndex } = props;
  return (
    <div className="macro-score" data-testid="macro-score">
      <div className="score-title">{t("PTI.SCORE")}</div>
      <div className="score" data-testid="macro-score-pti" style={{ backgroundColor: PTIRatingLevels[ratingIndex].color }}>
        {score}
      </div>
      <div className="score-total">{t("PTI.TOTAL")}</div>
      <div className="score-description">{t("PTI.SCORE.DESCRIPTION")}</div>
    </div>
  );
};
