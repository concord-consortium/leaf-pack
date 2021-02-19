import React from "react";
import { useDrag } from "react-dnd";
import { TrayImagePreview } from "./tray-image-preview";
import { TrayType, TrayObject } from "../../utils/sim-utils";

import "./tray-image.scss";

interface IProps {
  trayObject: TrayObject;
  onTrayObjectSelect: (type: TrayType) => void;
  traySelectionType?: TrayType;
  trayWrapper: HTMLDivElement | null;
}

export const TrayImage: React.FC<IProps> = (props) => {
  const { trayObject, onTrayObjectSelect, traySelectionType, trayWrapper } = props;
  const TrayObjectImage = trayObject.image;

  const [{isDragging, ...otherDragProps}, drag ] = useDrag({
    item: { type: trayObject.type, trayIndex: trayObject.trayIndex, dragImage: trayObject.dragImage,
            left: trayObject.left, top: trayObject.top },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      dragPosition: monitor.getClientOffset(),
      dragSourcePosition: monitor.getSourceClientOffset(),
    }),
  });

  const containerStyle = {left: trayObject.left, top: trayObject.top, width: trayObject.width, height: trayObject.height,
                          zIndex: trayObject.zIndex};
  const imageStyle = {width: trayObject.width, height: trayObject.height, transform: `rotate(${trayObject.rotation}deg)`};

  return (
    <>
      {isDragging &&
        <TrayImagePreview trayWrapper={trayWrapper} trayObject={trayObject} {...otherDragProps} />}
      <div style={containerStyle} className="tray-image-container">
        <TrayObjectImage
          className={`tray-object-image ${trayObject.type === traySelectionType ? "highlight" : ""} ${isDragging ? "dragging" : ""}`}
          style={imageStyle}
        />
        <svg version="1.1" className="tray-object-image-selectable" style={imageStyle}>
          <path
            ref={drag}
            cursor="pointer"
            pointerEvents="visible"
            fillRule="evenodd"
            onClick={() => onTrayObjectSelect(trayObject.type)}
            className="selectable-area"
            d={trayObject.selectionPath}
          />
        </svg>
      </div>
    </>
  );
};
