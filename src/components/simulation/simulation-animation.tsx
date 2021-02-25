import React, { useState }  from "react";
import { useInterval } from "../../hooks/use-interval";
import { SimAnimation } from "../../utils/sim-utils";
import { getRandomInteger } from "../../utils/math-utils";

import "./simulation-animation.scss";

const kDefaultInterval = 133;

interface IProps {
  animation: SimAnimation;
  interval?: number;
}

export const SimulationAnimation: React.FC<IProps> = ({ animation, interval = kDefaultInterval }) => {
  const maxFrame = animation.frames.length;
  const [currentFrame, setCurrentFrame] = useState(getRandomInteger(0, maxFrame - 1));

  useInterval(() => {
    setCurrentFrame(frame => (frame + 1) % maxFrame);
  }, interval);

  const uniqueUrls = new Set(animation.frames);
  const transform = `rotate(${animation.rotation}deg) scaleX(${animation.xScale}) scaleY(${animation.yScale})`;
  return (
    <>
      {Array.from(uniqueUrls).map((url, index) => {
        const visibleUrl = animation.frames[currentFrame];
        const visibility = url === visibleUrl ? "visible" : "hidden";
        return (
          <img
            key={`unique-url-${index}`}
            src={url}
            className="simulation-animation"
            style={{ top: animation.top, left: animation.left, transform, visibility }}
            alt={animation.altText}
          />
        );
      })}
    </>
  );
};
