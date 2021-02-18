import React, { useState } from "react";
import { chemistryTests, ChemTestType, ChemistryTestResult } from "../../utils/chem-utils";
import { getRandomInteger } from "../../utils/math-utils";
import { SectionButtons } from "./section-buttons";
import { ChemResults } from "./chem-results";
import { ChemTest } from "./chem-test";

import "./chemistry-panel.scss";

interface IProps {
  isRunning: boolean;
}

export const ChemistryPanel: React.FC<IProps> = (props) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [chemistryTestResults, setChemistryTestResults] = useState([
    {type: ChemTestType.airTemperature, stepsComplete: 0, value: 0},
    {type: ChemTestType.waterTemperature, stepsComplete: 0, value: 0},
    {type: ChemTestType.pH, stepsComplete: 0, value: 0},
    {type: ChemTestType.nitrate, stepsComplete: 0, value: 0},
    {type: ChemTestType.turbidity, stepsComplete: 0, value: 0},
    {type: ChemTestType.dissolvedOxygen, stepsComplete: 0, value: 0}
  ]);

  // TODO: move this to the model state
  const handleUpdateTestResult = (type: ChemTestType, completedStep: number) => {
    const updatedChemistryTestResults = chemistryTestResults.map((result: ChemistryTestResult) => {
      if (result.type === type) {
        const updatedResult = { ...result };
        updatedResult.stepsComplete = completedStep;
        const currentTest = chemistryTests.find((test) => test.type === type);
        if (completedStep === currentTest?.steps.length) {
          updatedResult.value = currentTest.values[getRandomInteger(0, currentTest.values.length - 1)].value;
        }
        return updatedResult;
      } else {
        return result;
      }
    });
    setChemistryTestResults(updatedChemistryTestResults);
  };

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
              onUpdateTestResult={handleUpdateTestResult}
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
