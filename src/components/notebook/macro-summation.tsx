import React from "react";
import t from "../../utils/translation/translate";
import { TrayAnimal } from "../../utils/sim-utils";
import PTIIcon from "../../assets/pti-icon.svg";

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
    </div>
  );
};
