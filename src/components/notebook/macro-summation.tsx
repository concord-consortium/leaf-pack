import React from "react";
import t from "../../utils/translation/translate";
import PTIIcon from "../../assets/pti-icon.svg";
import { MacroSensitivities } from "./macro-sensitivities";
import { MacroScore } from "./macro-score";
import { MacroRating } from "./macro-rating";
import { SensitivityType, TrayObject, Animals } from "../../utils/sim-utils";
import { getPTIScore, getPTIRatingIndex } from "../../utils/macro-utils";

import "./macro-summation.scss";

interface IProps {
  trayObjects: TrayObject[];
}

export const MacroSummation: React.FC<IProps> = (props) => {
  const { trayObjects } = props;

  const taxaSensitivities: Record<SensitivityType, number> = {sensitive: 0, somewhatSensitive: 0, tolerant: 0};
  trayObjects.forEach((obj, i) => {
    if (obj.count > 0 && obj.collected) {
      const animal = Animals.find((a) => a.type === obj.type);
      if (animal) {
        taxaSensitivities[animal.sensitivity]++;
      }
    }
  });

  const score = getPTIScore(trayObjects);
  const ratingIndex = getPTIRatingIndex(score);

  return (
    <div className="macro-summation">
      <div className="header">
        <PTIIcon className="PTI-icon" />
        {t("PTI.HEADER")}
      </div>
      <div className="summary">
        <MacroSensitivities taxaSensitivities={taxaSensitivities} />
        <div className="triangle" />
        <MacroScore score={score} ratingIndex={ratingIndex} />
        <MacroRating ratingIndex={ratingIndex} />
      </div>
    </div>
  );
};
