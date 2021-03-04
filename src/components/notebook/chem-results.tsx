import React from "react";
import { ChemistryTestResult } from "../../utils/chem-types";
import { chemistryTests, chemTestRatings } from "../../utils/chem-utils";
import CheckIcon from "../../assets/check-icon.svg";
import t from "../../utils/translation/translate";

import "./chem-results.scss";

interface IProps {
  chemistryTestResults: ChemistryTestResult[];
}

export const ChemResults: React.FC<IProps> = (props) => {
  const { chemistryTestResults } = props;

  return (
    <div className="chem-results" data-testid="chem-results">
      <div className="header">
        <div className="category-label">{t("CHEM.TEST")}</div>
        <div className="category-label">{t("CHEM.WATER.RESULT")}</div>
      </div>
      <div className="results">
        {chemistryTests.map((test, index) => {
          const testResult = chemistryTestResults.find((result) => result.type === test.type);
          const testValue = test.results.find((res) => res.value === testResult?.value);
          const complete = testResult?.value !== undefined && testResult?.stepsComplete === test.steps.length;
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
                    {started ? t("CHEM.TEST.INCOMPLETE") : t("CHEM.TEST.UNSTARTED")}
                  </div>
              }
            </div>
          );})
        }
      </div>
    </div>
  );
};
