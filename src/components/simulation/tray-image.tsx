import React from "react";
import { TrayType, AnimalType, TrayAnimal } from "../../utils/sim-utils";
import { useDrag } from "react-dnd";
import { usePreview } from "react-dnd-preview";
import tempPreview from "../../assets/drag-preview.png";

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

  const [{isDragging}, drag ] = useDrag({
    item: { type: trayObject.type },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const PreviewImage = () => {
    const {display, item, style} = usePreview();
    if (!display) {
      return null;
    }
    return <img style={style} src={tempPreview} className="preview" />;
  };

  const containerStyle = {left: trayObject.x, top: trayObject.y, width, height, transform: `rotate(${trayObject.rotation}deg)`};
  const iconStyle = {width, height};

  return (
    <>
      <PreviewImage />
      <div style={containerStyle} className="tray-image">
        <Icon className={`tray-image-svg ${isDragging ? "highlight" : ""}`} style={iconStyle} />
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
      </div>
    </>
  );
};
