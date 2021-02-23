import React from "react";
import { act, render, waitFor } from "@testing-library/react";
import { ChemTestAnimation } from "./chem-test-animation";
import { ChemTestAnimationFrame } from "../../utils/chem-types";

describe("ChemTestAnimation component", () => {

  const onComplete = jest.fn();

  beforeEach(() => {
    onComplete.mockReset();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const TestImage: React.FC = () => {
    return null;
  };

  const singleBlankFrame: ChemTestAnimationFrame[] = [
          {label: "0", image: "none", duration: 0 }
        ];

  const singleFrame: ChemTestAnimationFrame[] = [
          {label: "0", image: TestImage, duration: 0 }
        ];

  const singleFrameByValue: ChemTestAnimationFrame[] = [
          {label: "0", image: "byValue", duration: 0 }
        ];
  const finalValueEntry: any = { frames: { "0": TestImage } };

  const twoFrames: ChemTestAnimationFrame[] = [
          {label: "0", image: "none", duration: 10 },
          {label: "1", image: "none", duration: 10 }
        ];

  it("handles empty frames array", () => {
    render(<ChemTestAnimation frames={[]} isComplete={false} onComplete={onComplete} />);
    act(() => {
      jest.runAllTimers();
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("renders single frame with default timeout", () => {
    render(<ChemTestAnimation frames={singleBlankFrame} isComplete={false} onComplete={onComplete} />);
    act(() => {
      jest.runAllTimers();
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("renders single frame", () => {
    render(<ChemTestAnimation frames={singleFrame} timeout={0} isComplete={false} onComplete={onComplete} />);
    act(() => {
      jest.runAllTimers();
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("renders single frame by value", () => {
    render(<ChemTestAnimation frames={singleFrameByValue} timeout={0} isComplete={false} onComplete={onComplete} />);
    act(() => {
      jest.runAllTimers();
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("renders single frame by value with result map", () => {
    render(<ChemTestAnimation frames={singleFrameByValue} finalValueEntry={finalValueEntry} timeout={0} isComplete={false} onComplete={onComplete} />);
    act(() => {
      jest.runAllTimers();
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("renders two frames", async () => {
    render(<ChemTestAnimation frames={twoFrames} timeout={0} isComplete={false} onComplete={onComplete} />);
    act(() => {
      jest.runAllTimers();
    });
    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
  });
});
