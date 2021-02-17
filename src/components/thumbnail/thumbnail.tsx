import React from "react";
import { IThumbnailProps } from "./thumbnail-chooser/thumbnail-chooser";
import { IModelInputState, IModelOutputState } from "../app";
import IconEnvironment from "../../assets/stream-icon.svg";
import IconChemistryNotebook from "../../assets/chemistry-icon.svg";
import IconHabitatNotebook from "../../assets/habitat-icon.svg";
import IconMacroinvertebratesNotebook from "../../assets/macro-icon.svg";
import IconPTI from "../../assets/pti-icon.svg";
import IconSun from "../../assets/sunny-icon.svg";
import { Environments } from "../../utils/sim-utils";
import t from "../../utils/translation/translate";

import "./thumbnail.scss";

export const Thumbnail: React.FC<IThumbnailProps<IModelInputState, IModelOutputState>> = (props) => {
  const {inputState: {environment, sunnyDayFequency},
        outputState: {habitatFeatures, pti}} = props.container;
  const showHabitatIcon = habitatFeatures.size > 0;
  const showMacroinvertebratesIcon = (pti ?? 0) > 0;
  const showChemistryIcon = false;  // TODO: figure out criteria for showing chemistry icon
  const sunnyDays = sunnyDayFequency === 0 ? t("SUNNYDAY.FEW.SHORT") : t("SUNNYDAY.MANY.SHORT");
  const environmentIndex = Environments.findIndex((e) => e.type === environment) + 1;
  return (
    <div className="thumbnail" data-testid="thumbnail">
      <div className="environment">
        <IconEnvironment />
        <div className="label">{environmentIndex}</div>
      </div>
      <div className="sunny-days">
        <IconSun />
        <div className="label">{t(sunnyDays)}</div>
      </div>
      <div className="pollution-tolerance">
        <IconPTI />
        <div className="label">{pti}</div>
      </div>
      <div className="notebook-row">
        <IconHabitatNotebook style={{ visibility: showHabitatIcon ? "visible" : "hidden"}} />
        <IconMacroinvertebratesNotebook style={{ visibility: showMacroinvertebratesIcon ? "visible" : "hidden"}} />
        <IconChemistryNotebook style={{ visibility: showChemistryIcon ? "visible" : "hidden"}} />
      </div>
    </div>
  );
};
