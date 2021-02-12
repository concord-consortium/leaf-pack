import React from "react";
import { TrayType, AnimalType, TrayAnimal, LeafType } from "../../utils/sim-utils";
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
  const { Icon, width, height, trayObject, onTrayObjectSelect } = props;
  const allowDrag = trayObject.type !== LeafType.birch && trayObject.type !== LeafType.maple && trayObject.type !== LeafType.oak;
  const [{isDragging}, drag ] = useDrag({
    item: { type: trayObject.type, dragImage: trayObject.dragImage, rotation: trayObject.rotation },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    canDrag: allowDrag,
  });

  const PreviewImage = () => {
    const {display, item, style} = usePreview();
    if (!display) {
      return null;
    }
    // TODO: add rotation
    // TODO: position offset
    // style.transform = `rotate(${item.rotation}deg)`;
    return <img style={style} src={item.dragImage} className="preview" />;
  };

  const containerStyle = {left: trayObject.x, top: trayObject.y, width, height, transform: `rotate(${trayObject.rotation}deg)`};
  const iconStyle = {width, height};

  return (
    <>
      <PreviewImage />
      <div style={containerStyle} className="tray-image">
        <Icon className={`tray-image-svg ${isDragging ? "highlight" : ""}`} style={iconStyle} />
        { allowDrag &&
          <svg version="1.1" className="tray-image-clickable" width={25} height={25} style={{left: width ? width / 2 - 12.5 : 0, top: height ? height / 2 - 12.5 : 0}}>
            <path
              ref={drag}
              cursor="pointer"
              pointerEvents="visible"
              fillRule="evenodd"
              onClick={() => onTrayObjectSelect(AnimalType.aquaticWorm)}
              className="click-area"
              d="M0 0 L25 0 L25 25 L00 25 Z"
            />
          </svg>
        }
      </div>
    </>
  );
};
