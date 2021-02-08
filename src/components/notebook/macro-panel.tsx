import React, { useState } from "react";
import { SectionButtons } from "./section-buttons";
import { Animals, Sensitivities } from "../../utils/sim-utils";

import "./macro-panel.scss";

const kCrittersPerSection = 5;
const kMaxCritters = 20;
const kMaxGraphWidth = 64;

interface IProps {
  isRunning: boolean;
}

export const MacroPanel: React.FC<IProps> = (props) => {
  const [currentSection, setCurrentSection] = useState(0);
  const numSections = Math.ceil(Animals.length / kCrittersPerSection);

  return (
    <div className="macro-panel">
      <div className="critters">
        {Animals.map((animal, index) => {
          const sensitivity = Sensitivities.find((s) => s.type === animal.sensitivity);
          return (
            index >= kCrittersPerSection * currentSection &&
            index < kCrittersPerSection * currentSection + kCrittersPerSection &&
            <div key={`critter-${index}`} className="critter" style={{backgroundColor: sensitivity?.backgroundColor}}>
              <div className="image-box" />
              <div className="name">{animal.label}</div>
              <div className="count">10</div>
              <div className="graph" style={{borderColor: sensitivity?.graphColor}}>
                <div className="bar" style={{backgroundColor: sensitivity?.graphColor, width: kMaxGraphWidth * 10 / kMaxCritters}} />
              </div>
              <div className="sensitivity">{sensitivity?.label}</div>
            </div>
          );
        })}
      </div>
      <SectionButtons
        currentSection={currentSection}
        totalSections={numSections}
        onSelectSection={setCurrentSection}
      />
    </div>
  );
};
