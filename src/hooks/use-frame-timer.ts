import { useCallback, useEffect, useRef, useState } from "react";

interface IProps {
  numFrames: number;
  initialDuration?: number;
  isComplete?: boolean;
  onComplete?: () => void;
}
export const useFrameTimer = ({numFrames, initialDuration = 1, isComplete = false, onComplete}: IProps) => {
  const lastFrame = numFrames - 1;
  const [frame, setFrame] = useState(isComplete || (numFrames === 0) ? lastFrame : 0);

  const timerId = useRef<number | null>(null);

  const nextFrame = useCallback(() => {
    setFrame(index => {
      (index === lastFrame) && onComplete?.();
      return index + 1;
    });
    timerId.current = null;
  }, [lastFrame, onComplete]);

  const waitForNextFrame = useCallback((duration: number) => {
    timerId.current = window.setTimeout(nextFrame, 1000 * duration);
  }, [nextFrame]);

  useEffect(() => {
    // set the initial timer on mount
    if (!isComplete) {
      waitForNextFrame(initialDuration);
    }
    // clear the timer when we unmount
    return () => {
      timerId.current && window.clearTimeout(timerId.current);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [frame, waitForNextFrame] as const;
};
