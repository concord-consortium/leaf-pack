import React, { useState } from "react";
import { SectionButtons } from "./section-buttons";
import { Animals, Sensitivities, TrayObject, TrayType } from "../../utils/sim-utils";
import { MacroSummation } from "./macro-summation";
import { MacroAnimalRow } from "./macro-animal-row";

import "./macro-panel.scss";

const kCrittersPerSection = 5;

interface IProps {
  trayObjects: TrayObject[];
  onCategorizeAnimal: (trayType: TrayType | undefined, notebookType: TrayType | undefined) => void;
  traySelectionType?: TrayType;
}

export const MacroPanel: React.FC<IProps> = (props) => {
  const { trayObjects, onCategorizeAnimal, traySelectionType } = props;

  const [currentSection, setCurrentSection] = useState(0);
  // there is an extra summation section as well as the pages that display the animals
  const numSections = Math.ceil(Animals.length / kCrittersPerSection) + 1;

  return (
    <div className="macro-panel" data-testid="macro-panel">
      <div className="critters">
        {Animals.map((animal, index) => {
          const sensitivity = Sensitivities.find((s) => s.type === animal.sensitivity);
          const trayAnimal = trayObjects.find((obj) => obj.type === animal.type);
          const count = trayAnimal?.collected ? trayAnimal.count : 0;
          return (
            index >= kCrittersPerSection * currentSection &&
            index < kCrittersPerSection * currentSection + kCrittersPerSection &&
            <MacroAnimalRow
              key={`row-${index}`}
              trayAnimal={trayAnimal}
              animal={animal}
              count={count}
              sensitivity={sensitivity}
              onCategorizeAnimal={onCategorizeAnimal}
              traySelectionType={traySelectionType}
            />
          );
        })}
        {currentSection === numSections - 1 &&
          <MacroSummation
            trayObjects={trayObjects}
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
