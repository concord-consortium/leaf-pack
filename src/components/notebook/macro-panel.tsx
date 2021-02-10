import React, { useState } from "react";
import { SectionButtons } from "./section-buttons";
import { Animals, Sensitivities, TrayAnimal } from "../../utils/sim-utils";
import { MacroSummation } from "./macro-summation";

import "./macro-panel.scss";

const kCrittersPerSection = 5;
// TODO: determine what this max is. Do we need a max for each animal type?
const kMaxCritters = 60;
const kMaxGraphWidth = 64;

interface IProps {
  isRunning: boolean;
  trayAnimals: TrayAnimal[];
}

export const MacroPanel: React.FC<IProps> = (props) => {
  const { trayAnimals } = props;

  const [currentSection, setCurrentSection] = useState(0);
  // there is an extra summation section as well as the pages that display the animals
  const numSections = Math.ceil(Animals.length / kCrittersPerSection) + 1;

  return (
    <div className="macro-panel">
      <div className="critters">
        {Animals.map((animal, index) => {
          const sensitivity = Sensitivities.find((s) => s.type === animal.sensitivity);
          const trayAnimal = trayAnimals.find((ta) => ta.type === animal.type);
          const count = trayAnimal?.collected ? trayAnimal.count : 0;
          const AnimalIcon = animal.image;
          return (
            index >= kCrittersPerSection * currentSection &&
            index < kCrittersPerSection * currentSection + kCrittersPerSection &&
            <div key={`critter-${index}`} className="critter" style={{backgroundColor: sensitivity?.backgroundColor}}>
              { trayAnimal?.collected
                ? <div className="image-box" style={{borderColor: sensitivity?.graphColor}}>
                    <AnimalIcon className="animal-icon" />
                  </div>
                : <div className="empty-box" style={{backgroundColor: sensitivity?.blockColor}} />
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
        })}
        {currentSection === numSections - 1 &&
          <MacroSummation
            trayAnimals={trayAnimals}
          />
        }
      </div>
      <SectionButtons
        currentSection={currentSection}
        totalSections={numSections}
        onSelectSection={setCurrentSection}
      />
    </div>
  );
};
