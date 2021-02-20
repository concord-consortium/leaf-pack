import React from "react";
import { ChemistryTest, ChemistryTestResult } from "../../utils/chem-types";
import { chemTestRatings } from "../../utils/chem-utils";
import t from "../../utils/translation/translate";

import "./input-result.scss";

interface IProps {
  chemistryTest: ChemistryTest;
  chemistryTestResult: ChemistryTestResult;
}

export const InputResult: React.FC<IProps> = (props) => {
  const { chemistryTest, chemistryTestResult } = props;
  const testValue = chemistryTest.results.find((res) => res.value === chemistryTestResult?.value);
  const ratingType = testValue?.rating;
  const rating = chemTestRatings.find((r) => r.type === ratingType);
  return (
    <div className="input-result">
      {t("CHEM.RESULT")}
      <div className="current-result">
        <div className="test-result">{`${chemistryTestResult?.value} ${chemistryTest.units}`}</div>
        {rating && <div>=</div>}
        {rating && <div className="test-rating" style={{backgroundColor: rating.color}}>{rating.label}</div>}
      </div>
    </div>
  );
};
