import React from "react";
import { ProgressBar } from "@concord-consortium/react-components";
import { StreamScore } from "./stream-score";
import { ThumbnailTitle } from "../thumbnail/thumbnail-chooser/thumbnail-title";

import "./main-view-wrapper.scss";

export interface IMainViewWrapperProps {
  title: string;
  isSaved: boolean;
  isFinished: boolean;
  onSaveClicked: () => void;
  ptiScore?: number;
  currentTime: number;
  maxTime: number;
  currentTimeLabel: string;
  savedBgColor: string;
}

export const MainViewWrapper: React.FC<IMainViewWrapperProps> = (props) => {
  const { title, isSaved, children, ptiScore, currentTime, maxTime, currentTimeLabel, savedBgColor } = props;
  return (
    <div className="main-view-wrapper">
      <ThumbnailTitle title={title} empty={false} saved={isSaved} savedBgColor={savedBgColor} />
      <div className="model-view">
        { children }
      </div>
      <div className="stream-score-container">
        <StreamScore ptiScore={ptiScore} />
      </div>
      <div className="progress-container">
        <ProgressBar
          currentTime={currentTime}
          maxTime={maxTime}
          currentTimeLabel={currentTimeLabel}
          customClassName={"sim-progress"}
        />
      </div>
      {/* <div className="save-container">
        <SaveButton
          label={isSaved ? t("BUTTON.SAVED") : t("BUTTON.SAVE")}
          customClassName={isSaved ? "saved-btn" : ""}
          onClick={onSaveClicked}
          disabled={!isFinished || isSaved}
        />
      </div> */}
    </div>
  );
};
