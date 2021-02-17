import React, { useState } from "react";
import { SectionButtons } from "./section-buttons";

import "./chemistry-panel.scss";

interface IProps {
  isRunning: boolean;
}

export const ChemistryPanel: React.FC<IProps> = (props) => {
  const [currentSection, setCurrentSection] = useState(0);
  const numSections = 7; // TODO: derive this from export in util module

  return (
    <div className="chemistry-panel">
      <div className="section-content">
        Chemistry Panel
      </div>
      <SectionButtons
        currentSection={currentSection}
        totalSections={numSections}
        onSelectSection={setCurrentSection}
        showHomeButton={true}
      />
    </div>
  );
};
