import React from "react";
import t from "../../utils/translation/translate";
import SortingTray from "../../assets/sorting-tray.svg";
import CloseIcon from "../../assets/close-icon.svg";
import { Animal, Animals, AnimalType, TrayAnimal } from "../../utils/sim-utils";

import "./tray.scss";

interface IProps {
  trayAnimals: TrayAnimal[];
  hidden: boolean;
  onHideTray: () => void;
  onCollectAnimal: (type: AnimalType) => void;
  isRunning: boolean;
}

export const Tray: React.FC<IProps> = (props) => {
  const { trayAnimals, hidden, onCollectAnimal, onHideTray } = props;
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
        const animal = Animals.find((a: Animal) => a.type === ta.type);
        const Icon = animal?.image;
        const width = animal?.width;
        return (ta.count > 0 && !ta.collected && Icon &&
          <Icon
            className="animal-icon"
            key={`animal-image-${index}`}
            style={{left: ta.x, top: ta.y, width, transform: `rotate(${ta.rotation}deg)`}}
            onClick={() => onCollectAnimal(ta.type)}
          />
        );
      })}
    </div>
  );
};
