import React from "react";
import t from "../../utils/translation/translate";

import "./macro-score.scss";

interface IProps {
  score: number;
}

export const MacroScore: React.FC<IProps> = (props) => {
  return (
    <div className="macro-score">
      <div className="score-title">{t("PTI.SCORE")}</div>
      <div className="score">{props.score}</div>
      <div className="score-total">{t("PTI.TOTAL")}</div>
      <div className="score-description">{t("PTI.SCORE.DESCRIPTION")}</div>
    </div>
  );
};
