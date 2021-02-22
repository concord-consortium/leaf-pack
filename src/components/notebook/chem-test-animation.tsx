import classNames from "classnames";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ChemTestAnimationFrame, ChemTestValue } from "../../utils/chem-types";

interface IProps {
  frames: ChemTestAnimationFrame[];
  timeout?: number;
  finalValueEntry?: ChemTestValue;
  onComplete?: () => void;
}
export const ChemTestAnimation: React.FC<IProps> = ({ frames, timeout = 500, finalValueEntry, onComplete }) => {
  const [frameIndex, setFrameIndex] = useState(0);

  const lastFrame = frames.length - 1;
  const frame = frames[frameIndex];
  const frameKey = `frame-${frame?.label}`;
  const classes = classNames(frameKey,
                              { "frame-first": frameIndex === 0, "frame-last": frameIndex === lastFrame },
                              "chem-frame");
  const Image = frame?.image
                  ? typeof frame.image === "string"
                      ? frame.image === "byValue"
                          ? finalValueEntry?.frames?.[frame.label]
                          : undefined
                      : frame.image
                  : undefined;

  const timerId = useRef<number | null>(null);
  const nextFrame = useCallback(() => {
    setFrameIndex(index => index + 1);
    timerId.current = null;
  }, []);

  useEffect(() => {
    // set the initial timer for the first frame
    timerId.current = window.setTimeout(nextFrame, 1000 * frame.duration);
    // only clear the timer when we unmount
    return () => timerId.current ? window.clearTimeout(timerId.current) : undefined;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TransitionGroup>
      <CSSTransition key={frameKey} classNames={classes} timeout={timeout} unmountOnExit
                      onEntered={() => {
                        if (frameIndex < frames.length - 1) {
                          // not on the last frame - start the frame timer
                          timerId.current = window.setTimeout(nextFrame, 1000 * frames[frameIndex].duration);
                        }
                        else {
                          // on the last frame - signal that the animation is complete
                          onComplete?.();
                        }
                      }} >
        {Image ? <Image/> : () => null}
      </CSSTransition>
    </TransitionGroup>
  );
};
