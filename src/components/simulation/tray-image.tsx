import React from "react";
import { TrayType, TrayAnimal, LeafType } from "../../utils/sim-utils";
import { useDrag } from "react-dnd";
import { usePreview } from "react-dnd-preview";

import "./tray-image.scss";

interface IProps {
  trayObject: TrayAnimal;
  Icon: any;
  width: number | undefined;
  height: number | undefined;
  onTrayObjectSelect: (type: TrayType) => void;
  traySelectionType?: TrayType;
}

export const TrayImage: React.FC<IProps> = (props) => {
  const { Icon, width, height, trayObject, onTrayObjectSelect, traySelectionType } = props;
  // TODO: allow leaf drag
  const allowDrag = trayObject.type !== LeafType.birch && trayObject.type !== LeafType.maple && trayObject.type !== LeafType.oak;

  const [{isDragging, dragPosition, dragOffsetPosition}, drag ] = useDrag({
    // TODO: check this list
    item: { type: trayObject.type, trayIndex: trayObject.trayIndex, dragImage: trayObject.dragImage,
            rotation: trayObject.rotation, left: trayObject.x, top: trayObject.y },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
      dragPosition: monitor.getClientOffset(),
      dragOffsetPosition: monitor.getSourceClientOffset()
    }),
    canDrag: allowDrag,
  });

  const PreviewImage = () => {
    const {display, item} = usePreview();
    if (!display) {
      return null;
    }
    // TODO: clean up
    const offsetX = dragPosition?.x && dragOffsetPosition?.x ? dragPosition.x - dragOffsetPosition?.x : 0;
    const offsetY = dragPosition?.y && dragOffsetPosition?.y ? dragPosition.y - dragOffsetPosition?.y : 0;
    const boundingBoxOffsetX = (trayObject.boundingBoxWidth - (width || 0)) / 2;
    const boundingBoxOffsetY = (trayObject.boundingBoxHeight - (height || 0)) / 2;
    const positionedStyle = {top: dragPosition?.y ? dragPosition.y - offsetY + boundingBoxOffsetY : 0,
                             left: dragPosition?.x ? dragPosition.x - offsetX + boundingBoxOffsetX : 0,
                             transform: `rotate(${trayObject.rotation}deg)`};
    return <img style={positionedStyle} src={item.dragImage} className="preview" />;
  };

  const containerStyle = {left: trayObject.x, top: trayObject.y, width: trayObject.width, height: trayObject.height};
  const imageStyle = {width, height, transform: `rotate(${trayObject.rotation}deg)`};

  return (
    <div style={containerStyle} className="tray-image-container">
      {isDragging && <PreviewImage />}
      <Icon className={`tray-image-svg ${isDragging || trayObject.type === traySelectionType ? "highlight" : ""}`} style={imageStyle} />
      { allowDrag &&
        <svg version="1.1" className="tray-image-clickable" style={imageStyle}>
          <path
            ref={drag}
            cursor="pointer"
            pointerEvents="visible"
            fillRule="evenodd"
            onClick={() => onTrayObjectSelect(trayObject.type)}
            className="click-area"
            d={trayObject.hitBoxPath}
          />
        </svg>
      }
    </div>
  );
};
