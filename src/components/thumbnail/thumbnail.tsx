import React from "react";
import { IThumbnailProps } from "./thumbnail-chooser/thumbnail-chooser";
import { IModelInputState, IModelOutputState } from "../app";
import IconEnvironment from "../../assets/stream-icon.svg";
import IconSun from "../../assets/sunny-icon.svg";
import { Environments } from "../../utils/sim-utils";
import t from "../../utils/translation/translate";

import "./thumbnail.scss";

export const Thumbnail: React.FC<IThumbnailProps<IModelInputState, IModelOutputState>> = (props) => {
  const {inputState} = props.container;
  const {sunnyDayFequency, environment} = inputState;
  const sunnyDays = sunnyDayFequency === 0 ? t("SUNNYDAY.FEW.SHORT") : t("SUNNYDAY.MANY.SHORT");
  const environmentIndex = Environments.filter((e) => e.enabled).findIndex((e) => e.type === environment) + 1;
  return (
    <div className="thumbnail" data-testid="thumbnail">
      <div className="inputs">
        <div className="environment">
          <IconEnvironment />
          <div className="label">{environmentIndex}</div>
        </div>
        <div className="sunny-days">
          <IconSun />
          <div className="label">{t(sunnyDays)}</div>
        </div>
      </div>
    </div>
  );
};
