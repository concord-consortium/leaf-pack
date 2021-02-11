import React from "react";
import { Sensitivity, TrayAnimal, TrayType, Animal, AnimalType } from "../../utils/sim-utils";
import { useDrop } from "react-dnd";

import "./macro-panel.scss";

// TODO: determine what this max is. Do we need a max for each animal type?
const kMaxCritters = 60;
const kMaxGraphWidth = 64;

interface IProps {
  trayAnimal: TrayAnimal | undefined;
  animal: Animal;
  AnimalIcon: any;
  index: number;
  sensitivity: Sensitivity | undefined;
  count: number;
  onCategorizeAnimal: (trayType: TrayType | undefined, notebookType: TrayType | undefined) => void;
  traySelectionType?: TrayType;
}

export const MacroAnimalRow: React.FC<IProps> = (props) => {
  const { trayAnimal, animal, AnimalIcon, index, sensitivity, count, onCategorizeAnimal, traySelectionType } = props;

  const [{ isOver }, drop] = useDrop({
    accept: [AnimalType.stoneFly, AnimalType.mayFly, AnimalType.caddisFly, AnimalType.dobsonFly,
             AnimalType.riffleBeetle, AnimalType.dragonFly, AnimalType.scud, AnimalType.clamOrMussel,
             AnimalType.crayFish, AnimalType.midgeFly, AnimalType.blackFly, AnimalType.planarian,
             AnimalType.leech, AnimalType.aquaticWorm ],
    drop: (item: any) => {
      console.log("drop");
      onCategorizeAnimal(AnimalType.aquaticWorm, AnimalType.aquaticWorm);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div key={`critter-${index}`} className="critter" style={{backgroundColor: sensitivity?.backgroundColor}} ref={drop}>
      { trayAnimal?.collected
        ? <div className="image-box" style={{borderColor: sensitivity?.graphColor}}>
            <AnimalIcon className="animal-icon" />
          </div>
        : <div
            className={`empty-box ${traySelectionType ? "enabled" : ""} ${isOver ? "highlight" : ""}`}
            style={{backgroundColor: sensitivity?.blockColor,
                    borderColor: isOver ? sensitivity?.graphColor : "#333333"}}
            onClick={() => onCategorizeAnimal(traySelectionType, trayAnimal?.type)}
          />
      }
      <div className="name">{animal.label}</div>
      <div className="count">{count}</div>
      <div className="graph" style={{borderColor: sensitivity?.graphColor}}>
        <div
          className="bar"
          style={{backgroundColor: sensitivity?.graphColor, width: kMaxGraphWidth * count / kMaxCritters}}
        />
      </div>
      <div className="sensitivity">{sensitivity?.label}</div>
    </div>
  );
};
