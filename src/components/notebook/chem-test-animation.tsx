import classNames from "classnames";
import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useFrameTimer } from "../../hooks/use-frame-timer";
import { ChemTestAnimationFrame, ChemTestValue } from "../../utils/chem-types";

interface IProps {
  frames: ChemTestAnimationFrame[];
  timeout?: number;
  finalValueEntry?: ChemTestValue;
  isComplete: boolean;
  onComplete?: () => void;
}
export const ChemTestAnimation: React.FC<IProps> = ({ frames, timeout = 500, finalValueEntry, isComplete, onComplete }) => {

  const lastFrame = frames.length - 1;
  const initialDuration = frames.length > 0 ? frames[0].duration : undefined;
  const [frameIndex, waitForNextFrame] = useFrameTimer({
                                          numFrames: frames.length, initialDuration, isComplete, onComplete });

  const frame = frames[Math.min(frameIndex, lastFrame)];
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

  return (
    <TransitionGroup>
      <CSSTransition key={frameKey} classNames={classes} timeout={timeout} unmountOnExit
                      onEntered={() => {
                        if (frameIndex < frames.length) {
                          waitForNextFrame(frames[frameIndex].duration);
                        }
                      }} >
        {Image ? <Image/> : () => null}
      </CSSTransition>
    </TransitionGroup>
  );
};
