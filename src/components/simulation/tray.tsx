import React from "react";
import t from "../../utils/translation/translate";
import SortingTray from "../../assets/sorting-tray.svg";
import CloseIcon from "../../assets/close-icon.svg";
import { Animal, Animals, TrayAnimal, LeafType, TrayType } from "../../utils/sim-utils";
import { TrayImage } from "./tray-image";

import "./tray.scss";

interface IProps {
  trayAnimals: TrayAnimal[];
  hidden: boolean;
  onHideTray: () => void;
  onTrayObjectSelect: (type: TrayType) => void;
  traySelectionType?: TrayType;
  isRunning: boolean;
}

export const Tray: React.FC<IProps> = (props) => {
  const { trayAnimals, hidden, onTrayObjectSelect, onHideTray, traySelectionType } = props;

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
        const Icon = ta?.image || animal?.image;
        const width = animal?.width;
        const height = animal?.height;
        return (((ta.count > 0 && !ta.collected) || ta.type === LeafType.leaf) && Icon &&
          <TrayImage
            key={`animal-image-${index}`}
            Icon={Icon}
            width={width}
            height={height}
            trayAnimal={ta}
            onTrayObjectSelect={onTrayObjectSelect}
            traySelectionType={traySelectionType}
          />
        );
      })}
    </div>
  );
};
