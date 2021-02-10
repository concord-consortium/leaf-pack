import React from "react";
import t from "../../utils/translation/translate";
import PTIIcon from "../../assets/pti-icon.svg";
import { MacroSensitivities } from "./macro-sensitivities";
import { MacroScore } from "./macro-score";
import { MacroRating } from "./macro-rating";
import { Sensitivities, SensitivityType, PTIRatingLevels, TrayAnimal, Animals } from "../../utils/sim-utils";

import "./macro-summation.scss";

interface IProps {
  trayAnimals: TrayAnimal[];
}

export const MacroSummation: React.FC<IProps> = (props) => {
  const { trayAnimals } = props;

  const taxaSensitivities: Record<SensitivityType, number> = {sensitive: 0, somewhatSensitive: 0, tolerant: 0};
  trayAnimals.forEach((ta, i) => {
    if (ta.count > 0 && ta.collected) {
      const animal = Animals.find((a) => a.type === ta.type);
      if (animal) {
        taxaSensitivities[animal.sensitivity]++;
      }
    }
  });


  let score = 0;
  Sensitivities.forEach((s, i) => {
    score = score + taxaSensitivities[s.type] * (Sensitivities.length - i);
  });

  let ratingIndex = 0;
  for (let i = PTIRatingLevels.length - 1; i >= 0; i--) {
    if (score >= PTIRatingLevels[i].min) {
      ratingIndex = i;
    }
  }

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
