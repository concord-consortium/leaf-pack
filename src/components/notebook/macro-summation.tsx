import React from "react";
import t from "../../utils/translation/translate";
import PTIIcon from "../../assets/pti-icon.svg";
import { MacroSensitivities } from "./macro-sensitivities";
import { MacroScore } from "./macro-score";
import { MacroRating } from "./macro-rating";
import { Sensitivities, SensitivityType } from "../../utils/sim-utils";

import "./macro-summation.scss";

interface IProps {
  taxaSensitivities: Record<SensitivityType, number>;
}

export const MacroSummation: React.FC<IProps> = (props) => {
  const { taxaSensitivities } = props;
  let score = 0;
  Sensitivities.forEach((s, i) => {
    score = score + taxaSensitivities[s.type] * (Sensitivities.length - i);
  });

  return (
    <div className="macro-summation">
      <div className="header">
        <PTIIcon className="PTI-icon" />
        {t("PTI.HEADER")}
      </div>
      <div className="summary">
        <MacroSensitivities taxaSensitivities={taxaSensitivities} />
        <div className="triangle" />
        <MacroScore score={score} />
        <MacroRating ratingIndex={3} />
      </div>
    </div>
  );
};
