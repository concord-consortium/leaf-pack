import React from "react";
import t from "../../utils/translation/translate";
import PTIIcon from "../../assets/pti-icon.svg";
import { MacroScore } from "./macro-score";

import "./macro-summation.scss";

interface IProps {
  numSensitive: number;
  numSomewhatSensitive: number;
  numTolerant: number;
}

export const MacroSummation: React.FC<IProps> = (props) => {
  return (
    <div className="macro-summation">
      <div className="header">
        <PTIIcon className="PTI-icon" />
        {t("PTI.HEADER")}
      </div>
      <div className="summary">
        <div className="summary">summary</div>
        <div className="triangle" />
        <MacroScore score={10} />
        <div className="rating">rating</div>
      </div>
    </div>
  );
};
