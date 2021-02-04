import React from "react";
import { ContainerId, IContainer } from "../../../hooks/use-model-state";
import { ThumbnailWrapper } from "./thumbnail-wrapper";
import t from "../../../utils/translation/translate";

import "./thumbnail-chooser.scss";

export interface IThumbnailProps<IModelInputState, IModelOutputState> {
  container: IContainer<IModelInputState, IModelOutputState>;
}

export interface IThumbnailChooserProps<IModelInputState, IModelOutputState> {
  containers: Record<ContainerId, IContainer<IModelInputState, IModelOutputState> | null>;
  Thumbnail: React.FC<IThumbnailProps<IModelInputState, IModelOutputState>>
  selectedContainerId: ContainerId;
  setSelectedContainerId: (containerId: ContainerId) => void;
  clearContainer: (containerId: ContainerId) => void;
  savedBgColor: string;
  selectedContainerBgColor: string;
}

export const ThumbnailChooser: React.FC<IThumbnailChooserProps<Record<string, any>, Record<string, any>>> = (props) => {
  const { containers, Thumbnail, selectedContainerId, setSelectedContainerId, clearContainer, savedBgColor,
    selectedContainerBgColor } = props;
  // Disable unselected thumbnails until user saves the current one.
  const unselectedThumbnailsDisabled = !containers[selectedContainerId]?.inputState;
  return (
    <div className="thumbnail-chooser" data-testid="thumbnail-chooser">
      <div className="thumbnail-chooser-title">{t("THUMBNAIL-CHOOSER.TITLE")}</div>
      <div className="thumbnail-chooser-list">
        {Object.keys(containers).map((containerId: ContainerId) => {
          const container = containers[containerId];
          const selected = containerId === selectedContainerId;
          return (
            <ThumbnailWrapper Thumbnail={Thumbnail} key={containerId} containerId={containerId} container={container}
              selected={selected} setSelectedContainerId={setSelectedContainerId} clearContainer={clearContainer}
              disabled={!selected && unselectedThumbnailsDisabled} savedBgColor={savedBgColor}
              selectedContainerBgColor={selectedContainerBgColor} />
          );
        })}
      </div>
    </div>
  );
};
