import { act, renderHook } from "@testing-library/react-hooks";
import { useFrameTimer } from "./use-frame-timer";

type UseFrameTimerReturn = readonly [number, (n: number) => void];

describe("useErrorClass", () => {

  const onComplete = jest.fn();

  beforeEach(() => {
    onComplete.mockReset();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("handles 0 frames", async () => {
    const { result } = renderHook<number, UseFrameTimerReturn>(() =>
                        useFrameTimer({ numFrames: 0 }));
    expect(result.current[0]).toBe(-1);
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current[0]).toBe(0);
    expect(onComplete).toHaveBeenCalledTimes(0);
  });

  test("handles 0 frames", async () => {
    const { result } = renderHook<number, UseFrameTimerReturn>(() =>
                        useFrameTimer({ numFrames: 0, initialDuration: 0.5, onComplete }));
    expect(result.current[0]).toBe(-1);
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current[0]).toBe(0);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  test("handles 1 frame", async () => {
    const { result } = renderHook<number, UseFrameTimerReturn>(() =>
                        useFrameTimer({ numFrames: 1, onComplete }));
    expect(result.current[0]).toBe(0);
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current[0]).toBe(1);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  test("handles 2 frames", async () => {
    const { result } = renderHook<number, UseFrameTimerReturn>(() =>
                        useFrameTimer({ numFrames: 2, onComplete }));
    expect(result.current[0]).toBe(0);
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current[0]).toBe(1);
    act(() => {
      result.current[1](100);
      jest.runAllTimers();
    });
    expect(result.current[0]).toBe(2);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  test("handles 2 frames with isComplete", async () => {
    const { result } = renderHook<number, UseFrameTimerReturn>(() =>
                        useFrameTimer({ numFrames: 2, isComplete: true, onComplete }));
    expect(result.current[0]).toBe(1);
    act(() => {
      jest.runAllTimers();
    });
    expect(result.current[0]).toBe(1);
    expect(onComplete).toHaveBeenCalledTimes(0);
  });

  test("clears timer on unmount", async () => {
    const { result, unmount } = renderHook<number, UseFrameTimerReturn>(() =>
                                  useFrameTimer({ numFrames: 2, onComplete }));
    expect(result.current[0]).toBe(0);
    act(() => {
      unmount();
    });
    expect(onComplete).toHaveBeenCalledTimes(0);
  });

});
