import React from "react";
import { ChemistryTest, ChemTestType, ChemistryTestResult } from "../../utils/chem-utils";
import CheckIcon from "../../assets/check-icon.svg";
import t from "../../utils/translation/translate";

import "./chem-test.scss";

interface IProps {
  chemistryTest: ChemistryTest;
  testIndex: number;
  chemistryTestResults: ChemistryTestResult[];
  onUpdateTestResult: (type: ChemTestType, completedStep: number) => void;
}

export const ChemTest: React.FC<IProps> = (props) => {
  const { chemistryTest, testIndex, chemistryTestResults, onUpdateTestResult } = props;
  const testResult = chemistryTestResults.find((result) => result.type === chemistryTest.type);
  const stepsComplete = testResult ? testResult?.stepsComplete : 0;
  return (
    <div className="chem-test">
      <div className="header">
        <div className="test-num">{testIndex + 1}</div>
        {`${chemistryTest.label} ${t("CHEM.TEST")}`}
      </div>
      <div className="test-container">
        <div className="test-content"/>
        <div className="step-buttons">
          { chemistryTest.steps.map((step, index) =>
            <button
              className={`step-button ${index > stepsComplete ? "disabled" : ""} ${index < stepsComplete ? "finished" : ""}`}
              key={`${chemistryTest.type}-step-button-${index}`}
              onClick={() => onUpdateTestResult(chemistryTest.type, index + 1)}
            >
              {step.label}
              { (index < stepsComplete) &&
                <div className="step-check">
                  <CheckIcon
                    width={10}
                  />
                </div>
              }
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
