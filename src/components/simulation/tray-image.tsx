import React from "react";
import { TrayType, TrayObject, LeafType } from "../../utils/sim-utils";
import { useDrag } from "react-dnd";
import { usePreview } from "react-dnd-preview";

import "./tray-image.scss";

interface IProps {
  trayObject: TrayObject;
  Icon: any;
  width: number;
  height: number;
  onTrayObjectSelect: (type: TrayType) => void;
  traySelectionType?: TrayType;
}

export const TrayImage: React.FC<IProps> = (props) => {
  const { Icon, width, height, trayObject, onTrayObjectSelect, traySelectionType } = props;
  // TODO: allow leaf drag
  const allowDrag = trayObject.type !== LeafType.birch && trayObject.type !== LeafType.maple && trayObject.type !== LeafType.oak;

  const [{isDragging, dragPosition, dragSourcePosition}, drag ] = useDrag({
    item: { type: trayObject.type, trayIndex: trayObject.trayIndex, dragImage: trayObject.dragImage,
            left: trayObject.x, top: trayObject.y },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      dragPosition: monitor.getClientOffset(),
      dragSourcePosition: monitor.getSourceClientOffset()
    }),
    canDrag: allowDrag,
  });

  const PreviewImage = () => {
    const {display, item} = usePreview();
    if (!display || !dragPosition || !dragSourcePosition) {
      return null;
    }
    const dragDeltaX = dragPosition.x - dragSourcePosition.x;
    const dragDeltaY = dragPosition.y - dragSourcePosition.y;
    const boundingBoxDeltaX = (trayObject.boundingBoxWidth - width) / 2;
    const boundingBoxDeltaY = (trayObject.boundingBoxHeight - height) / 2;
    const previewStyle = {
      left: dragPosition.x - dragDeltaX + boundingBoxDeltaX,
      top: dragPosition.y - dragDeltaY + boundingBoxDeltaY,
      transform: `rotate(${trayObject.rotation}deg)`
    };
    return <img style={previewStyle} src={item.dragImage} className="preview" />;
  };

  const containerStyle = {left: trayObject.x, top: trayObject.y, width: trayObject.width, height: trayObject.height,
                          zIndex: trayObject.zIndex};
  const imageStyle = {width, height, transform: `rotate(${trayObject.rotation}deg)`};

  return (
    <>
      {isDragging && <PreviewImage />}
      <div style={containerStyle} className="tray-image-container">
        <Icon
          className={`tray-image-svg ${isDragging || trayObject.type === traySelectionType ? "highlight" : ""}`}
          style={imageStyle}
        />
        { allowDrag &&
          <svg version="1.1" className="tray-image-clickable" style={imageStyle}>
            <path
              ref={drag}
              cursor="pointer"
              pointerEvents="visible"
              fillRule="evenodd"
              onClick={() => onTrayObjectSelect(trayObject.type)}
              className="click-area"
              d={trayObject.selectionPath}
            />
          </svg>
        }
      </div>
    </>
  );
};
