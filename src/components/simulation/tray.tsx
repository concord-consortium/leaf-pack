import React from "react";
import { Animal, Animals, AnimalCount } from "../../utils/sim-utils";

import "./tray.scss";

interface IProps {
  animalCounts: AnimalCount[];
  hidden: boolean;
  onHideTray: () => void;
  isRunning: boolean;
}

export const Tray: React.FC<IProps> = (props) => {
  const { animalCounts, hidden, onHideTray } = props;
  return (
    <div className={`tray ${hidden ? "hidden" : ""}`}>
      <div className="header">
        <div className="title">Leaf Pack Sorting Tray</div>
        <button className="close" onClick={onHideTray}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12">
            <line x1="0" y1="0" x2="12" y2="12" strokeWidth="2.5"/>
            <line x1="12" y1="0" x2="0" y2="12" strokeWidth="2.5"/>
          </svg>
        </button>
      </div>
      { animalCounts.map((ac, index) =>
          ac.count > 0 &&
          <div key={`animal-count-${index}`}>
            {`${Animals.find((a: Animal) => a.type === ac.type)?.label}: ${ac.count}`}
          </div>
      )}
      <div className="tray-row">
        { animalCounts.map((ac, index) => {
          const Icon = Animals.find((a: Animal) => a.type === ac.type)?.image;
          return (ac.count > 0 && Icon && <Icon className="animal-icon" key={`animal-image-${index}`} />);
        })}
      </div>
    </div>
  );
};
