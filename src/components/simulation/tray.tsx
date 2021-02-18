import React from "react";
import t from "../../utils/translation/translate";
import SortingTray from "../../assets/sorting-tray.svg";
import CloseIcon from "../../assets/close-icon.svg";
import { TrayObject, TrayType, draggableAnimalTypes, draggableLeafTypes } from "../../utils/sim-utils";
import { TrayImage } from "./tray-image";
import { useDrop } from "react-dnd";

import "./tray.scss";

interface IProps {
  trayObjects: TrayObject[];
  hidden: boolean;
  onHideTray: () => void;
  onTrayObjectSelect: (type: TrayType) => void;
  traySelectionType?: TrayType;
  onTrayObjectMove: (trayIndex: number, left: number, top: number) => void;
  isRunning: boolean;
}

export const Tray: React.FC<IProps> = (props) => {
  const { trayObjects, hidden, onTrayObjectSelect, onHideTray, traySelectionType, onTrayObjectMove } = props;

  const [{ isOver }, drop] = useDrop({
    accept: [...draggableAnimalTypes, ...draggableLeafTypes],
    drop: (item: any, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.round(item.left + delta?.x);
      const top = Math.round(item.top + delta?.y);
      onTrayObjectMove(item.trayIndex, left, top);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div className={`tray ${hidden ? "hidden" : ""}`} ref={drop}>
      <SortingTray />
      <div className="header">
        <div className="title">{t("SORTINGTRAY")}</div>
        <button className="close" onClick={onHideTray} aria-label={t("BUTTON.CLOSE")}>
          <CloseIcon />
        </button>
      </div>
      { trayObjects.map((trayObject, index) => {
        return ((trayObject.count > 0 && !trayObject.collected) &&
          <TrayImage
            key={`animal-image-${index}`}
            trayObject={trayObject}
            onTrayObjectSelect={onTrayObjectSelect}
            traySelectionType={traySelectionType}
            dragOverTray={isOver}
          />
        );
      })}
    </div>
  );
};
