import React, { useState }  from "react";
import { useInterval } from "../../hooks/use-interval";
import { SimAnimation } from "../../utils/sim-utils";
import { getRandomInteger } from "../../utils/math-utils";

import "./simulation-animation.scss";

const kFrameInterval = 133;

interface IProps {
  animation: SimAnimation,
}

export const SimulationAnimation: React.FC<IProps> = (props) => {
  const { animation } = props;
  const maxFrame = animation.frames.length;
  const [currentFrame, setCurrentFrame] = useState(getRandomInteger(0, maxFrame - 1));
  useInterval(() => {
    setCurrentFrame(frame => (frame + 1) % maxFrame);
  }, kFrameInterval);


  const transformation = `rotate(${animation.rotation}deg) scaleX(${animation.xScale}) scaleY(${animation.yScale})`;
  return (
    <img
      src={animation.frames[currentFrame]}
      className={"simulation-animation"}
      style={{ top: animation.top, left: animation.left, transform: transformation }}
    />
  );
};
