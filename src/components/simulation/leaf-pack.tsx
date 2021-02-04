import React from "react";
import { LeafPackStates, LeafDecompositionType } from "../../utils/sim-utils";
import "./leaf-pack.scss";

interface IProps {
  leafDecomposition: LeafDecompositionType;
  left?: number;
  top?: number;
  isRunning: boolean;
}

export const LeafPack: React.FC<IProps> = (props) => {
  const { leafDecomposition, left, top, isRunning } = props;
  return (
    <div className="leaf-pack" data-testid="leaf-pack" style={{left, top}}>
      {LeafPackStates.map((leafState, index) =>
        <img
          src={leafState.image}
          key={`leaf-${index}`}
          className={`${leafState.leafDecomposition === leafDecomposition ? "selected" : ""} ${isRunning ? "slow-animate" : ""}`}
        />
      )}
    </div>
  );
};
