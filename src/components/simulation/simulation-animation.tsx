import React, { useState }  from "react";
import { useInterval } from "../../hooks/use-interval";
import { SimAnimation } from "../../utils/sim-utils";

import "./simulation-animation.scss";

const kFrameInterval = 133;

interface IProps {
  animation: SimAnimation,
}

export const SimulationAnimation: React.FC<IProps> = (props) => {
  const { animation } = props;
  const maxFrame = animation.frames.length;
  const [currentFrame, setCurrentFrame] = useState(Math.floor(Math.random() * Math.floor(maxFrame)));
  useInterval(() => {
    setCurrentFrame(frame => (frame + 1) % maxFrame);
  }, kFrameInterval);


  const transformation = `rotate(${animation.rotation}deg) scaleX(${animation.xScale}) scaleY(${animation.yScale})`;
  return (
    <img
      src={animation.frames[currentFrame]}
      className={"simulation-animation"}
      style={{ top: animation.y, left: animation.x, transform: transformation }}
    />
  );
};
