import React from "react";
import Slider from "@material-ui/core/Slider";
import IconSun from "../../assets/sunny-icon.svg";
import IconHorizontalHandle from "../../assets/icon-slider-horizontal.svg";
import { sunnyDaySliderMarks } from "../../utils/sim-utils";
import t from "../../utils/translation/translate";

import "./sunny-day-slider.scss";
import "./slider.scss";

interface IProps {
  onChangeSunnyDaySlider: (event: any, value: number) => void;
  sunnyDayFequency: number;
  disabled: boolean;
}

export const SunnyDaySlider: React.FC<IProps> = (props) => {
  const { disabled } = props;
  return (
    <div className="sunny-day-slider" data-testid="sunny-day-slider">
      <div className="header">
        <IconSun />
        <div className="label">{t("SUNNYDAY.LABEL")}</div>
      </div>
      <div className={`slider ${disabled ? "disabled" : ""}`}>
        <Slider
          classes={{thumb: "thumb" }}
          min={0}
          max={1}
          value={props.sunnyDayFequency}
          step={1}
          marks={sunnyDaySliderMarks}
          onChange={disabled ? undefined : props.onChangeSunnyDaySlider}
          ThumbComponent={IconHorizontalHandle}
          data-test="sunny-day-slider"
        />
      </div>
    </div>
  );
};
