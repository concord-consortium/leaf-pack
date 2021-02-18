import React from "react";
import { TrayType, TrayObject, draggableLeafTypes } from "../../utils/sim-utils";
import { useDrag } from "react-dnd";
import { usePreview } from "react-dnd-preview";

import "./tray-image.scss";

// the drag ref is attached to the clickable outline which is a little smaller than the actual
// SVG dimensions which include the highlight border. To get the drag preview to display properly
// we need to take into account how much the clickable outline is offset from the SVG upper-left
// corner. This ends up being about 5 pixels for all tray objects. Technically it could be computed
// by hand for ALL tray objects, but subtracting 5 pixels works pretty well in practice.
const kOutlineOffset = 5;
const kNonTrayPreviewHeight = 64;

interface IProps {
  trayObject: TrayObject;
  onTrayObjectSelect: (type: TrayType) => void;
  traySelectionType?: TrayType;
  dragOverTray: boolean;
}

export const TrayImage: React.FC<IProps> = (props) => {
  const { trayObject, onTrayObjectSelect, traySelectionType, dragOverTray } = props;
  const TrayObjectImage = trayObject.image;

  const [{isDragging, dragSourcePosition, dragPosition}, drag ] = useDrag({
    item: { type: trayObject.type, trayIndex: trayObject.trayIndex, dragImage: trayObject.dragImage,
            left: trayObject.left, top: trayObject.top },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      dragPosition: monitor.getClientOffset(),
      dragSourcePosition: monitor.getSourceClientOffset(),
    }),
  });

  const PreviewImage = () => {
    const {display, item} = usePreview();
    if (!display || !dragSourcePosition || !dragPosition) {
      return null;
    }
    const boundingBoxDeltaX = (trayObject.boundingBoxWidth - trayObject.width) / 2;
    const boundingBoxDeltaY = (trayObject.boundingBoxHeight - trayObject.height) / 2;
    let previewStyle = {};
    const isLeaf = draggableLeafTypes.includes(trayObject.type as any);
    if (dragOverTray || isLeaf) {
      previewStyle = {
        left: dragSourcePosition.x + boundingBoxDeltaX - kOutlineOffset,
        top: dragSourcePosition.y + boundingBoxDeltaY - kOutlineOffset,
        transform: `rotate(${trayObject.rotation}deg)`
      };
    } else {
      const previewHeight = Math.min(kNonTrayPreviewHeight, trayObject.height);
      previewStyle = {
        height: previewHeight,
        left: dragPosition.x - previewHeight / trayObject.height * trayObject.width / 2,
        top: dragPosition.y - previewHeight / 2,
      };
    }
    return <img style={previewStyle} src={item.dragImage} className="preview" />;
  };

  const containerStyle = {left: trayObject.left, top: trayObject.top, width: trayObject.width, height: trayObject.height,
                          zIndex: trayObject.zIndex};
  const imageStyle = {width: trayObject.width, height: trayObject.height, transform: `rotate(${trayObject.rotation}deg)`};

  return (
    <>
      {isDragging && <PreviewImage />}
      <div style={containerStyle} className="tray-image-container">
        <TrayObjectImage
          className={`tray-object-image ${isDragging || trayObject.type === traySelectionType ? "highlight" : ""}`}
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
