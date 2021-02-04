import React from "react";
import { ControlGroup } from "./control-group";
import { SunnyDaySlider } from "./sunny-day-slider";
import { EnvironmentSelect } from "./environment-select";
import { EnvironmentType } from "../../utils/sim-utils";
import { VCRButton } from "@concord-consortium/react-components";
import t from "../../utils/translation/translate";

import "./control-panel.scss";

interface IProps {
  isRunning: boolean;
  isPaused: boolean;
  isFinished: boolean;
  inputControlsDisabled: boolean;
  onStartSim: () => void;
  onPauseSim: () => void;
  onRewindSim: () => void;
  onChangeSunnyDaySlider: (event: any, value: number) => void;
  sunnyDayFequency: number;
  environment: EnvironmentType;
  onChangeEnvironment: (value: EnvironmentType) => void;
}

export const ControlPanel: React.FC<IProps> = (props) => {
  const { isRunning, isPaused, isFinished, inputControlsDisabled, onStartSim, onPauseSim, onRewindSim,
          onChangeSunnyDaySlider, sunnyDayFequency, environment, onChangeEnvironment } = props;
  const showPauseButton = isRunning && !isPaused && !isFinished;
  const hasModelStarted = isRunning || isFinished;
  return (
    <div className="control-panel" data-testid="control-panel">
      <ControlGroup>
        <EnvironmentSelect
          environment={environment}
          onChange={onChangeEnvironment}
          disabled={inputControlsDisabled}
        />
      </ControlGroup>
      <ControlGroup>
        <SunnyDaySlider
          sunnyDayFequency={sunnyDayFequency}
          onChangeSunnyDaySlider={onChangeSunnyDaySlider}
          disabled={inputControlsDisabled}
        />
      </ControlGroup>
      <ControlGroup last={true}>
        <div className="buttons">
          <VCRButton
            type={"rewind"}
            label={t("BUTTON.REWIND")}
            onClick={onRewindSim}
            disabled={!hasModelStarted}
            customClassName={"vcr-button"}
          />
          <VCRButton
            type={"play-pause"}
            label={showPauseButton ? t("BUTTON.PAUSE") : t("BUTTON.START")}
            running={showPauseButton}
            onClick={showPauseButton ? onPauseSim : onStartSim}
            disabled={isFinished}
            customClassName={"vcr-button"}
          />
        </div>
      </ControlGroup>
    </div>
  );
};
