import React  from "react";
import { useFadeIn } from "../../hooks/use-fade-in";
import { useFrameLoop } from "../../hooks/use-frame-loop";
import { useHashedStrings } from "../../hooks/use-hashed-strings";
import { SimAnimation } from "../../utils/sim-utils";

import "./simulation-animation.scss";

const kDefaultInterval = 133;

interface IProps {
  animation: SimAnimation;
  interval?: number;
  fadeIn?: number;  // milliseconds
}

export const SimulationAnimation: React.FC<IProps> = ({ animation, interval = kDefaultInterval, fadeIn }) => {
  const currentFrame = useFrameLoop(animation.frames.length, interval);

  const opacity = Math.round(1000 * useFadeIn(fadeIn)) / 1000;

  // hash the urls because blob urls can be multiple KB
  const uniqueUrls = useHashedStrings(animation.frames);
  const transform = `rotate(${animation.rotation}deg) scaleX(${animation.xScale}) scaleY(${animation.yScale})`;
  return (
    <>
      {Object.keys(uniqueUrls).map(key => {
        const currentUrl = uniqueUrls[key];
        const visibleUrl = animation.frames[currentFrame];
        const visibility = currentUrl === visibleUrl ? "visible" : "hidden";
        return (
          <img key={`${key}`} className="simulation-animation"
            src={currentUrl}
            style={{ top: animation.top, left: animation.left, transform, opacity, visibility }}
            alt={animation.altText}
          />
        );
      })}
    </>
  );
};
