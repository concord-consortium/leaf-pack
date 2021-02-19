import React from "react";
import { IThumbnailProps } from "./thumbnail-chooser/thumbnail-chooser";
import IconChemistryNotebook from "../../assets/chemistry-icon.svg";
import IconHabitatNotebook from "../../assets/habitat-icon.svg";
import IconMacroinvertebratesNotebook from "../../assets/macro-icon.svg";
import IconPTI from "../../assets/pti-icon.svg";
import IconSun from "../../assets/sunny-icon.svg";
import { IModelInputState, IModelOutputState } from "../../leaf-model-types";
import t from "../../utils/translation/translate";

import "./thumbnail.scss";

export const Thumbnail: React.FC<IThumbnailProps<IModelInputState, IModelOutputState>> = (props) => {
  const {inputState: {sunnyDayFequency},
        outputState: {habitatFeatures, pti, chemistryTestResults}} = props.container;
  const showHabitatIcon = habitatFeatures.size > 0;
  const showMacroinvertebratesIcon = (pti ?? 0) > 0;
  const showChemistryIcon = !!chemistryTestResults.find((result) => result.stepsComplete > 0);
  const sunnyDays = sunnyDayFequency === 0 ? t("SUNNYDAY.FEW.SHORT") : t("SUNNYDAY.MANY.SHORT");
  return (
    <div className="thumbnail" data-testid="thumbnail">
      <div className="sunny-days">
        <IconSun />
        <div className="label" data-testid="sunny-days-label">{t(sunnyDays)}</div>
      </div>
      <div className="pollution-tolerance">
        <IconPTI />
        <div className="label" data-testid="pollution-tolerance-label">{pti}</div>
      </div>
      <div className="notebook-row">
        <IconHabitatNotebook
          style={{ visibility: showHabitatIcon ? "visible" : "hidden"}}
          data-testid="habitat-icon" />
        <IconMacroinvertebratesNotebook
          style={{ visibility: showMacroinvertebratesIcon ? "visible" : "hidden"}}
          data-testid="macroinvertebrates-icon" />
        <IconChemistryNotebook
          style={{ visibility: showChemistryIcon ? "visible" : "hidden"}}
          data-testid="chemistry-icon" />
      </div>
    </div>
  );
};
