import React from "react";
import { XYCoord } from "react-dnd";
import { usePreview } from "react-dnd-preview";
import { draggableLeafTypes, TrayObject } from "../../utils/sim-utils";

// the drag ref is attached to the clickable outline which is a little smaller than the actual
// SVG dimensions which include the highlight border. To get the drag preview to display properly
// we need to take into account how much the clickable outline is offset from the SVG upper-left
// corner. This ends up being about 5 pixels for all tray objects. Technically it could be computed
// by hand for ALL tray objects, but subtracting 5 pixels works pretty well in practice.
const kOutlineOffset = 5;
const kNonTrayPreviewHeight = 48;

interface IProps {
  trayWrapper: HTMLDivElement | null;
  trayObject: TrayObject;
  dragSourcePosition: XYCoord | null;
  dragPosition: XYCoord | null;
}
export const TrayImagePreview: React.FC<IProps> = ({ trayWrapper, trayObject, dragSourcePosition, dragPosition }) => {
  const {display} = usePreview();
  if (!display || !dragSourcePosition || !dragPosition) {
    return null;
  }
  const boundingBoxDeltaX = (trayObject.boundingBoxWidth - trayObject.width) / 2;
  const boundingBoxDeltaY = (trayObject.boundingBoxHeight - trayObject.height) / 2;
  let previewStyle: React.CSSProperties;
  const isLeaf = draggableLeafTypes.includes(trayObject.type as any);

  const trayRect = trayWrapper?.getBoundingClientRect();
  const overTray = trayRect && (dragPosition.x >= trayRect.x && dragPosition.x <= (trayRect.x + trayRect.width) &&
                    dragPosition.y >= trayRect.y && dragPosition.y <= (trayRect.x + trayRect.height));

  if (overTray || isLeaf) {
    previewStyle = {
      left: dragSourcePosition.x + boundingBoxDeltaX - kOutlineOffset,
      top: dragSourcePosition.y + boundingBoxDeltaY - kOutlineOffset,
      width: trayObject.width,
      height: trayObject.height,
      transform: `rotate(${trayObject.rotation}deg)`
    };
  } else {
    const previewHeight = Math.min(kNonTrayPreviewHeight, trayObject.height);
    previewStyle = {
      height: previewHeight,
      left: dragPosition.x - (previewHeight / trayObject.height) * trayObject.width / 2,
      top: dragPosition.y - previewHeight / 2,
    };
  }
  const TrayObjectImage = trayObject.image;
  return <TrayObjectImage className="preview" data-testid="preview" style={previewStyle} />;
};
