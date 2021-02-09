import React from "react";
import t from "../../utils/translation/translate";
import SortingTray from "../../assets/sorting-tray.svg";
import CloseIcon from "../../assets/close-icon.svg";
import { Animal, Animals, TrayAnimal } from "../../utils/sim-utils";

import "./tray.scss";

interface IProps {
  trayAnimals: TrayAnimal[];
  hidden: boolean;
  onHideTray: () => void;
  isRunning: boolean;
}

export const Tray: React.FC<IProps> = (props) => {
  const { trayAnimals, hidden, onHideTray } = props;
  return (
    <div className={`tray ${hidden ? "hidden" : ""}`}>
      <SortingTray />
      <div className="header">
        <div className="title">{t("SORTINGTRAY")}</div>
        <button className="close" onClick={onHideTray}>
          <CloseIcon />
        </button>
      </div>
      { trayAnimals.map((ta, index) => {
        const Icon = Animals.find((a: Animal) => a.type === ta.type)?.image;
        return (ta.count > 0 && Icon &&
          <Icon
            className="animal-icon"
            key={`animal-image-${index}`}
            style={{left: ta.x, top: ta.y, transform: `rotate(${ta.rotation}deg)`}}
          />
        );
      })}
    </div>
  );
};
