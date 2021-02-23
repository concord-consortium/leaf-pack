import React, { useState } from "react";
import { ChemistryTestResult, ChemistryValues, IUpdateChemistryTestResult } from "../../utils/chem-types";
import { chemistryTests } from "../../utils/chem-utils";
import { SectionButtons } from "./section-buttons";
import { ChemResults } from "./chem-results";
import { ChemTest } from "./chem-test";

import "./chemistry-panel.scss";

interface IProps {
  chemistryValues?: ChemistryValues;
  chemistryTestResults: ChemistryTestResult[];
  onUpdateTestResult: ({type, currentStep, stepsComplete, value}: IUpdateChemistryTestResult) => void;
}

export const ChemistryPanel: React.FC<IProps> = (props) => {
  const { chemistryValues, chemistryTestResults, onUpdateTestResult } = props;
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
              chemistryValues={chemistryValues}
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
