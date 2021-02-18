import React, { useState } from "react";
import { chemistryTests, ChemTestType, ChemistryTestResult } from "../../utils/chem-utils";
import { SectionButtons } from "./section-buttons";
import { ChemResults } from "./chem-results";
import { ChemTest } from "./chem-test";

import "./chemistry-panel.scss";

interface IProps {
  chemistryTestResults: ChemistryTestResult[];
  onUpdateTestResult: (type: ChemTestType, completedStep: number, value?: number) => void;
  isRunning: boolean;
}

export const ChemistryPanel: React.FC<IProps> = (props) => {
  const { chemistryTestResults, onUpdateTestResult } = props;
  const [currentSection, setCurrentSection] = useState(0);

  // one extra page for the result summary
  const numSections = chemistryTests.length + 1;

  return (
    <div className="chemistry-panel">
      <div className="section-content">
        {currentSection === 0
          ? <ChemResults
              chemistryTestResults={chemistryTestResults}
            />
          : <ChemTest
              chemistryTest={chemistryTests[currentSection - 1]}
              testIndex={currentSection - 1}
              chemistryTestResults={chemistryTestResults}
              onUpdateTestResult={onUpdateTestResult}
            />
        }
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
