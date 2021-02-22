import React from "react";
import Slider from "@material-ui/core/Slider";
import IconHorizontalHandle from "../../assets/icon-slider-horizontal.svg";
import { ChemTestValue } from "../../utils/chem-types";

import "./chem-test-slider.scss";
import "../../components/control-panel/slider.scss";

const kSliderValWidth = 25;

interface IProps {
  onChangeSlider: (event: any, value: number) => void;
  sliderValue: number;
  testValues: ChemTestValue[];
  units: string;
}

export const ChemTestSlider: React.FC<IProps> = (props) => {
  const { sliderValue, onChangeSlider, testValues, units } = props;
  const sliderMarks = testValues.map((val, index) => {return ({value: index});});

  return (
    <div className="chem-slider" data-testid="chem-slider">
      <div className="slider-container">
        <div className="slider-values">
          { testValues.map((val, index) =>
            <div className={`value-container ${sliderValue === index ? "selected" : ""}`} key={`value-${val.value}`}>
              {val.value}
              <div className="bubble" style={{backgroundColor: val.color,
                                              borderColor: sliderValue === index ? "black" : (val?.borderColor || "white")}}>
                {val.Icon && <val.Icon className="slider-icon" width={21} />}
              </div>
            </div>
          )}
        </div>
        <div className="slider" style={{width: kSliderValWidth * (testValues.length - 1)}}>
          <Slider
            classes={{thumb: "thumb" }}
            min={0}
            max={testValues.length - 1}
            value={sliderValue}
            step={1}
            marks={sliderMarks}
            onChange={onChangeSlider}
            ThumbComponent={IconHorizontalHandle as any}
            data-test="chem-test-slider"
          />
        </div>
      </div>
      <div className="slider-units">{units}</div>
    </div>
  );
};
