import { useState } from "react";
import { getRandomInteger } from "../utils/math-utils";
import { useInterval } from "./use-interval";

export const useFrameLoop = (frameCount: number, frameInterval: number, start?: number) => {
  const firstFrame = start != null ? start : getRandomInteger(0, frameCount - 1);
  const [currentFrame, setCurrentFrame] = useState(firstFrame);

  useInterval(() => {
    setCurrentFrame(frame => (frame + 1) % frameCount);
  }, frameInterval);

  return currentFrame;
};
