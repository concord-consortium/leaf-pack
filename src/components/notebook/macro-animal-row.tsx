import React from "react";
import { useDrop } from "react-dnd";
import IncorrectSensitive from "../../assets/macroinvertebrates/incorrect-sensitive.svg";
import IncorrectSomewhatSensitive from "../../assets/macroinvertebrates/incorrect-somewhat-sensitive.svg";
import IncorrectTolerant from "../../assets/macroinvertebrates/incorrect-tolerant.svg";
import { useErrorClass } from "../../hooks/use-error-class";
import {
  Animal, draggableAnimalTypes, Sensitivity, SensitivityType, TrayObject, TrayType
} from "../../utils/sim-utils";

import "./macro-panel.scss";

const kMaxCritters = 60;
const kMaxGraphWidth = 64;

const errorX = (sensitivity: SensitivityType, errorClass: string) => {
  switch (sensitivity) {
    case SensitivityType.sensitive:
      return <IncorrectSensitive className={errorClass} data-testid="error-sensitive"/>;
    case SensitivityType.somewhatSensitive:
      return <IncorrectSomewhatSensitive className={errorClass} data-testid="error-somewhat-sensitive"/>;
    case SensitivityType.tolerant:
      return <IncorrectTolerant className={errorClass} data-testid="error-tolerant"/>;
  }
};

interface IProps {
  trayAnimal?: TrayObject;
  animal: Animal;
  sensitivity?: Sensitivity;
  count: number;
  onCategorizeAnimal: (trayType: TrayType | undefined, notebookType: TrayType | undefined) => void;
  traySelectionType?: TrayType;
}

export const MacroAnimalRow: React.FC<IProps> = (props) => {
  const { trayAnimal, animal, sensitivity, count, onCategorizeAnimal, traySelectionType } = props;
  const { image: AnimalIcon } = animal;
  const [errorClass, setErrorClass] = useErrorClass();

  const handleCategorizeAnimal = (trayType: TrayType | undefined, notebookType: TrayType | undefined) => {
    if (trayType && notebookType) {
      if (trayType === notebookType) {
        setErrorClass("");
        onCategorizeAnimal(trayType, notebookType);
      }
      else {
        setErrorClass("error");
      }
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: draggableAnimalTypes,
    drop: (item: any) => {
      handleCategorizeAnimal(item?.type, trayAnimal?.type);
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div key={`critter-${animal.type}`} className="critter" style={{backgroundColor: sensitivity?.backgroundColor}} ref={drop}
          data-testid={`critter-${animal.type}`}>
      { trayAnimal?.collected
        ? <div className="image-box" style={{borderColor: sensitivity?.graphColor}}>
            <AnimalIcon className="animal-icon" />
          </div>
        : <>
            <div
              className={`empty-box ${traySelectionType ? "enabled" : ""} ${isOver ? "highlight" : ""}`}
              data-testid={`empty-box-${animal.type}`}
              style={{backgroundColor: isOver ? sensitivity?.backgroundColor : sensitivity?.blockColor,
                      borderColor: isOver ? sensitivity?.graphColor : "#333333"}}
              onClick={() => handleCategorizeAnimal(traySelectionType, trayAnimal?.type)}
            />
            {errorClass && sensitivity && errorX(sensitivity.type, errorClass)}
          </>
      }
      <div className="name">{animal.label}</div>
      <div className="graph" style={{borderColor: sensitivity?.graphColor}}>
        <div
          className="bar"
          style={{backgroundColor: sensitivity?.graphColor, width: kMaxGraphWidth * count / kMaxCritters}}
        />
      </div>
      <div className="count">{count}</div>
      <div className="sensitivity">{sensitivity?.label}</div>
    </div>
  );
};
