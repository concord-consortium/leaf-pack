import React from "react";
import { TrayAnimal } from "../../utils/sim-utils";

import "./macro-summation.scss";

interface IProps {
  trayAnimals: TrayAnimal[];
}

export const MacroSummation: React.FC<IProps> = (props) => {
  return (
    <div className="macro-summation">
      Pollution Tolerance Index (PTI) Score and Rating
    </div>
  );
};
