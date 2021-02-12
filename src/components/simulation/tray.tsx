import React from "react";
import t from "../../utils/translation/translate";
import SortingTray from "../../assets/sorting-tray.svg";
import CloseIcon from "../../assets/close-icon.svg";
import { TrayAnimal, TrayType } from "../../utils/sim-utils";
import { TrayImage } from "./tray-image";

import "./tray.scss";

interface IProps {
  trayObjects: TrayAnimal[];
  hidden: boolean;
  onHideTray: () => void;
  onTrayObjectSelect: (type: TrayType) => void;
  traySelectionType?: TrayType;
  isRunning: boolean;
}

export const Tray: React.FC<IProps> = (props) => {
  const { trayObjects, hidden, onTrayObjectSelect, onHideTray, traySelectionType } = props;

  return (
    <div className={`tray ${hidden ? "hidden" : ""}`}>
      <SortingTray />
      <div className="header">
        <div className="title">{t("SORTINGTRAY")}</div>
        <button className="close" onClick={onHideTray}>
          <CloseIcon />
        </button>
      </div>
      { trayObjects.map((trayObject, index) => {
        const Icon = trayObject.image;
        const width = trayObject.width;
        const height = trayObject.height;
        return ((trayObject.count > 0 && !trayObject.collected) && Icon &&
          <TrayImage
            key={`animal-image-${index}`}
            Icon={Icon}
            width={width}
            height={height}
            trayObject={trayObject}
            onTrayObjectSelect={onTrayObjectSelect}
            traySelectionType={traySelectionType}
          />
        );
      })}
    </div>
  );
};
