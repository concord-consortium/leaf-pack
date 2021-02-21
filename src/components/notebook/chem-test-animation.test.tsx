import React from "react";
import { render, waitFor } from "@testing-library/react";
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

  const singleFrame: ChemTestAnimationFrame[] = [
          {label: "0", image: "none", duration: 0 }
        ];

  const twoFrames: ChemTestAnimationFrame[] = [
          {label: "0", image: "none", duration: 10 },
          {label: "1", image: "none", duration: 10 }
        ];

  it("renders single frame", async () => {
    render(<ChemTestAnimation frames={singleFrame} timeout={10} onComplete={onComplete} />);
    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1), { timeout: 100 });
  });

  it("renders two frames", async () => {
    render(<ChemTestAnimation frames={twoFrames} timeout={10} onComplete={onComplete} />);
    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1), { timeout: 100 });
  });
});
