import classNames from "classnames";
import React from "react";
import { ChemTestAnimation } from "./chem-test-animation";
import { ChemTestSlider } from "./chem-test-slider";
import { InputResult } from "./input-result";
import CheckIcon from "../../assets/check-icon.svg";
import { useCurrent } from "../../hooks/use-current";
import {
  ChemistryTest, ChemTestStep, StepType, ChemistryTestResult, ChemistryValues, IUpdateChemistryTestResult
} from "../../utils/chem-types";
import t from "../../utils/translation/translate";

import "./chem-test.scss";

interface IProps {
  chemistryTest: ChemistryTest;
  testIndex: number;
  chemistryValues?: ChemistryValues;
  chemistryTestResults: ChemistryTestResult[];
  onUpdateTestResult: ({type, currentStep, stepsComplete, value}: IUpdateChemistryTestResult) => void;
}

export const ChemTest: React.FC<IProps> = (props) => {
  const { chemistryTest, testIndex, chemistryValues, chemistryTestResults, onUpdateTestResult } = props;
  const testResult = useCurrent(chemistryTestResults.find((result) => result.type === chemistryTest.type));
  const currentStep = testResult.current?.currentStep;
  const stepsComplete = testResult.current?.stepsComplete ?? 0;
  const currentStepInfo = currentStep != null || stepsComplete > 0
          ? chemistryTest.steps[Math.max(0, currentStep ?? stepsComplete - 1)]
          : undefined;
  const testValueIndex = testResult.current?.value != null
          ? chemistryTest.results.findIndex((res) => res.value === testResult.current?.value)
          : 0;
  const finalValue = chemistryValues?.[chemistryTest.type];
  const finalValueEntry = finalValue != null
                            ? chemistryTest.results.find(result => result.value === finalValue)
                            : undefined;

  const handleStepButtonClick = (step: ChemTestStep, stepIndex: number) => {
    const stepInfo = chemistryTest.steps[stepIndex-1];
    const isAnimationStep = !stepInfo?.Image && (stepInfo?.frames != null);
    const value = step.type === StepType.tempDisplay ? finalValue : undefined;
    onUpdateTestResult(
      isAnimationStep
        ? { type: chemistryTest.type, currentStep: stepIndex - 1 }
        : { type: chemistryTest.type, stepsComplete: stepIndex, value }
    );
  };

  const handleChangeSlider = (event: any, val: number) => {
    onUpdateTestResult({
      type: chemistryTest.type, stepsComplete: chemistryTest.steps.length, value: chemistryTest.results[val].value
    });
  };

  const handleAnimationComplete = () => {
    const stepIndex = testResult.current?.currentStep;
    const stepInfo = (stepIndex != null) ? chemistryTest.steps[stepIndex] : undefined;
    const value = stepInfo?.type === StepType.tempDisplay ? finalValue : undefined;
    if ((testResult.current && (stepIndex != null) && (stepIndex >= testResult.current.stepsComplete))) {
      onUpdateTestResult({ type: chemistryTest.type, stepsComplete: stepIndex + 1, value });
    }
  };

  const stepFrames = currentStepInfo?.frames;
  const StepImage = currentStepInfo?.Image
                      ? typeof currentStepInfo.Image === "string"
                          ? finalValueEntry?.frames?.[currentStepInfo.Image]
                          : currentStepInfo.Image
                      : undefined;
  const animationKey = stepFrames
                        ? `${chemistryTest.type}-${stepFrames[stepFrames.length - 1].label}`
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
            {!currentStepInfo ? (chemistryTest.InitialImage ? <chemistryTest.InitialImage/> : "start") : undefined}
            {StepImage && <StepImage/>}
            {stepFrames && !StepImage &&
              <ChemTestAnimation key={animationKey} frames={stepFrames} finalValueEntry={finalValueEntry}
                                onComplete={handleAnimationComplete} />}
            {currentStepInfo && !stepFrames && !StepImage ? `${currentStepInfo.label} image` : undefined}
          </div>
          {currentStepInfo?.type === StepType.resultSlider &&
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
              className={classNames("step-button", {
                                      disabled: (index > stepsComplete) ||
                                                ((index === stepsComplete) &&
                                                  (index === testResult.current?.currentStep)),
                                      finished: index < stepsComplete })}
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
          {testResult.current?.value != null &&
            ((currentStepInfo?.type === StepType.resultSlider) || (currentStepInfo?.type === StepType.tempDisplay)) &&
            <InputResult
              chemistryTest={chemistryTest}
              chemistryTestResult={testResult.current}
            />
          }
        </div>
      </div>
    </div>
  );
};
