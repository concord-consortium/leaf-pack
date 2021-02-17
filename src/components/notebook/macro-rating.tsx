import React from "react";
import IconArrow from "../../assets/scale-pointer.svg";
import t from "../../utils/translation/translate";
import { PTIRatingLevels, PTIRatingLevel } from "../../utils/macro-utils";

import "./macro-rating.scss";

const kArrowoffset = 2;
const kArrowDelta = 27;

interface IProps {
  ratingIndex: number;
}

export const MacroRating: React.FC<IProps> = (props) => {
  return (
    <div className="macro-rating">
      <div className="rating-title">{t("PTI.RATING")}</div>
      <div className="legend">
        <div className="legend-blocks">
          { PTIRatingLevels.map((level: PTIRatingLevel, i: number) =>
              <div className="legend-block" data-testid="legend-block" style={{backgroundColor: level.color}} key={`legend-block-${i}`}>
                {level.label}
              </div>
          )}
        </div>
        <div className="ranges">
          { PTIRatingLevels.map((level: PTIRatingLevel, i: number) =>
              <div className="range" data-testid="legend-range" key={`legend-range-${i}`}>{level.range}</div>
          )}
        </div>
        <IconArrow className="legend-arrow" style={{top: kArrowoffset + kArrowDelta * props.ratingIndex}}/>
      </div>
    </div>
  );
};
