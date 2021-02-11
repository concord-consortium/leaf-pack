import React, { useState } from "react";
import { SectionButtons } from "./section-buttons";
import { Animals, Sensitivities, TrayAnimal, TrayType } from "../../utils/sim-utils";
import { MacroSummation } from "./macro-summation";
import { MacroAnimalRow } from "./macro-animal-row";

import "./macro-panel.scss";

const kCrittersPerSection = 5;

interface IProps {
  isRunning: boolean;
  trayAnimals: TrayAnimal[];
  onCategorizeAnimal: (trayType: TrayType | undefined, notebookType: TrayType | undefined) => void;
  traySelectionType?: TrayType;
}

export const MacroPanel: React.FC<IProps> = (props) => {
  const { trayAnimals, onCategorizeAnimal, traySelectionType } = props;

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
            <MacroAnimalRow
              key={`row-${index}`}
              trayAnimal={trayAnimal}
              animal={animal}
              AnimalIcon={AnimalIcon}
              index={index}
              count={count}
              sensitivity={sensitivity}
              onCategorizeAnimal={onCategorizeAnimal}
              traySelectionType={traySelectionType}
            />
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
