import React from "react";
import { ChemistryTestResult, chemistryTests, chemTestRatings } from "../../utils/chem-utils";
import CheckIcon from "../../assets/check-icon.svg";
import t from "../../utils/translation/translate";

import "./chem-results.scss";

interface IProps {
  chemistryTestResults: ChemistryTestResult[];
}

export const ChemResults: React.FC<IProps> = (props) => {
  const { chemistryTestResults } = props;

  return (
    <div className="chem-results">
      <div className="header">
        {t("CHEM.TEST")}
        {t("CHEM.RESULT")}
      </div>
      <div className="results">
        {chemistryTests.map((test, index) => {
          const testResult = chemistryTestResults.find((result) => result.type === test.type);
          const complete = testResult?.stepsComplete === test.steps.length;
          const testValue = test.values.find((val) => val.value === testResult?.value);
          const ratingType = testValue?.rating;
          const rating = chemTestRatings.find((r) => r.type === ratingType);
          const started = testResult ? testResult.stepsComplete > 0 : false;
          return (
            <div className="result-row" key={`chem-result-${index}`}>
              <div className={`test-check ${complete ? "complete" : ""}`}>
                {complete && <CheckIcon width={14} />}
              </div>
              <div className="test-num">{index + 1}</div>
              <div className="test-name">{test.label}</div>
              { complete
                ? <div className="complete">
                    <div className="test-result">{`${testResult?.value} ${test.units}`}</div>
                    {rating && <div>=</div>}
                    {rating && <div className="test-rating" style={{backgroundColor: rating.color}}>{rating.label}</div>}
                  </div>
                : <div className="incomplete">
                    {started ? "Test not yet complete" : "Test not yet run"}
                  </div>
              }
            </div>
          );})
        }
      </div>
    </div>
  );
};
