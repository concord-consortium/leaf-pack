import React from "react";
import IconScalePointer from "../../assets/scale-pointer.svg";
import { ScaleDisplayBlock } from "../../utils/sim-utils";

import "./scale.scss";

const kPointerOffset = 10;
const kPointerDelta = 42;

interface IProps {
  label: string;
  scaleDisplay: ScaleDisplayBlock[];
  scaleIndex: number;
  isRunning: boolean;
}

export const Scale: React.FC<IProps> = (props) => {
  return (
    <div className="scale" data-testid="scale">
      {props.label}
      <div className="scale-blocks">
        { props.scaleDisplay.map((item: ScaleDisplayBlock, i: number) =>
          <div className="scale-block" data-testid="scale-block" style={{backgroundColor: item.color}} key={`scale-block-${i}`}>
            {item.label}
          </div>
        )}
        <IconScalePointer
          className={`pointer ${props.isRunning ? "slow-animate" : ""}`}
          style={{left: kPointerOffset + kPointerDelta * props.scaleIndex}}
        />
      </div>
    </div>
  );
};
