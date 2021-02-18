import React from "react";
import { ChemistryTest, ChemTestType, ChemistryTestResult, StepType } from "../../utils/chem-utils";
import { ChemTestSlider } from "./chem-test-slider";
import CheckIcon from "../../assets/check-icon.svg";
import t from "../../utils/translation/translate";

import "./chem-test.scss";

interface IProps {
  chemistryTest: ChemistryTest;
  testIndex: number;
  chemistryTestResults: ChemistryTestResult[];
  onUpdateTestResult: (type: ChemTestType, completedStep: number, value?: number) => void;
}

export const ChemTest: React.FC<IProps> = (props) => {
  const { chemistryTest, testIndex, chemistryTestResults, onUpdateTestResult } = props;
  const testResult = chemistryTestResults.find((result) => result.type === chemistryTest.type);
  const stepsComplete = testResult?.stepsComplete ?? 0;
  const currentStep = chemistryTest.steps[Math.min(stepsComplete, chemistryTest.steps.length - 1)];

  const handleChangeSlider = (event: any, value: number) => {
    onUpdateTestResult(chemistryTest.type, chemistryTest.steps.length, chemistryTest.values[value].value);
  };

  return (
    <div className="chem-test">
      <div className="header">
        <div className="test-num">{testIndex + 1}</div>
        {`${chemistryTest.label} ${t("CHEM.TEST")}`}
      </div>
      <div className="test-container">
        <div className="test-content">
        { currentStep.type === StepType.resultSlider &&
          <ChemTestSlider
            onChangeSlider={handleChangeSlider}
            sliderValue={chemistryTest.values.findIndex((val) => val.value === testResult?.value) || 0}
            testValues={chemistryTest.values}
          />
        }
        </div>
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
