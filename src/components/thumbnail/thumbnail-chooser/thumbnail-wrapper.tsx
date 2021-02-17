import React from "react";
import { ThumbnailTitle } from "./thumbnail-title";
import { ContainerId, IContainer } from "../../../hooks/use-model-state";
import { IThumbnailProps } from "./thumbnail-chooser";
import CloseIcon from "../../../assets/close-icon.svg";
import t from "../../../utils/translation/translate";

import "./thumbnail-wrapper.scss";

export interface IThumbnailWrapperProps<IModelInputState, IModelOutputState> {
  containerId: ContainerId;
  selected: boolean;
  setSelectedContainerId: (containerId: ContainerId) => void;
  clearContainer: (containerId: ContainerId) => void;
  disabled: boolean;
  Thumbnail: React.FC<IThumbnailProps<IModelInputState, IModelOutputState>>
  container?: IContainer<IModelInputState, IModelOutputState> | null;
  savedBgColor: string;
  selectedContainerBgColor: string;
}

export const ThumbnailWrapper: React.FC<IThumbnailWrapperProps<Record<string, any>, Record<string, any>>> = (props) => {
  const className = `thumbnail-button${props.selected ? " selected" : ""}${!props.container ? " empty" : ""}`;
  const style = {backgroundColor: props.selected ? props.selectedContainerBgColor : undefined};
  const isSaved = !!props.container?.isSaved;
  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => props.setSelectedContainerId(props.containerId);
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    props.clearContainer(props.containerId);
  };

  return (
    <div className="thumbnail-wrapper" data-testid="thumbnail-wrapper">
      <button className={className} style={style} data-testid="thumbnail-button" onClick={handleSelect} disabled={props.disabled}>
        <ThumbnailTitle title={props.containerId} empty={!props.selected} saved={isSaved} savedBgColor={props.savedBgColor} />
        {
          !props.selected &&
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
            <line x1="8" y1="0" x2="8" y2="16" strokeWidth="2.5"/>
            <line x1="0" y1="8" x2="16" y2="8" strokeWidth="2.5"/>
          </svg>
        }
      </button>
      { props.container && <div className={`container ${!props.selected ? " disabled" : ""}`}><props.Thumbnail container={props.container} /></div> }
      {
        props.selected &&
        <button className="close" onClick={handleClose} disabled={props.disabled} aria-label={t("BUTTON.CLOSE")}>
          <CloseIcon />
        </button>
      }
    </div>
  );
};
