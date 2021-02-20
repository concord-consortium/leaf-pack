import React from "react";
import {
  ChemistryTest, ChemTestType, ChemTestStep, StepType, ChemistryTestResult, ChemistryValues
} from "../../utils/chem-types";
import { ChemTestSlider } from "./chem-test-slider";
import { InputResult } from "./input-result";
import CheckIcon from "../../assets/check-icon.svg";
import t from "../../utils/translation/translate";

import "./chem-test.scss";

interface IProps {
  chemistryTest: ChemistryTest;
  testIndex: number;
  chemistryValues?: ChemistryValues;
  chemistryTestResults: ChemistryTestResult[];
  onUpdateTestResult: (type: ChemTestType, completedStep: number, value?: number) => void;
}

export const ChemTest: React.FC<IProps> = (props) => {
  const { chemistryTest, testIndex, chemistryValues, chemistryTestResults, onUpdateTestResult } = props;
  const testResult = chemistryTestResults.find((result) => result.type === chemistryTest.type);
  const stepsComplete = testResult?.stepsComplete ?? 0;
  const currentStep = stepsComplete > 0
    ? chemistryTest.steps[Math.min(stepsComplete - 1, chemistryTest.steps.length - 1)]
    : undefined;
  const testValueIndex = testResult?.value != null
    ? chemistryTest.results.findIndex((res) => res.value === testResult.value)
    : 0;
  const finalValue = chemistryValues?.[chemistryTest.type];
  const finalValueEntry = finalValue != null
                            ? chemistryTest.results.find(result => result.value === finalValue)
                            : undefined;

  const handleStepButtonClick = (step: ChemTestStep, stepIndex: number) => {
    const value = step.type === StepType.tempDisplay ? finalValue : undefined;
    onUpdateTestResult(chemistryTest.type, stepIndex, value);
  };

  const handleChangeSlider = (event: any, val: number) => {
    onUpdateTestResult(chemistryTest.type, chemistryTest.steps.length, chemistryTest.results[val].value);
  };

  const StepImage = currentStep?.Image
                      ? typeof currentStep.Image === "string"
                          ? finalValueEntry?.frames?.[currentStep.Image]
                          : currentStep.Image
                      : undefined;

  return (
    <div className="chem-test">
      <div className="header">
        <div className="test-num">{testIndex + 1}</div>
        {`${chemistryTest.label} ${t("CHEM.TEST")}`}
      </div>
      <div className="test-container">
        <div className="test-content">
          <div className="image-stack">
            {!currentStep ? (chemistryTest.InitialImage ? <chemistryTest.InitialImage/> : "start") : undefined}
            {StepImage && <StepImage/>}
            {currentStep && !StepImage ? `${currentStep.label} image` : undefined}
          </div>
          {currentStep?.type === StepType.resultSlider &&
            <ChemTestSlider
              onChangeSlider={handleChangeSlider}
              sliderValue={testValueIndex}
              testValues={chemistryTest.results}
              units={chemistryTest.units}
            />
          }
        </div>
        <div className="step-buttons-results">
          {chemistryTest.steps.map((step, index) =>
            <button
              className={`step-button ${index > stepsComplete ? "disabled" : ""} ${index < stepsComplete ? "finished" : ""}`}
              key={`${chemistryTest.type}-step-button-${index}`}
              onClick={() => handleStepButtonClick(step, index + 1)}
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
          {testResult &&
            ((currentStep?.type === StepType.resultSlider) || (currentStep?.type === StepType.tempDisplay)) &&
            <InputResult
              chemistryTest={chemistryTest}
              chemistryTestResult={testResult}
            />
          }
        </div>
      </div>
    </div>
  );
};
