import { act, renderHook } from "@testing-library/react-hooks";
import { useErrorClass } from "./use-error-class";

describe("useErrorClass", () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("works with default values", () => {
    const { result } = renderHook<string, readonly [string, (s: string) => void]>(() => useErrorClass());
    expect(result.current[0]).toBe("");

    act(() => {
      result.current[1]("error");
    });
    expect(result.current[0]).toBe("error");

    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(result.current[0]).toBe("error fading");

    act(() => {
      jest.runAllTimers();
    });
    expect(result.current[0]).toBe("");
  });

  test("works with specific values", () => {
    const { result } = renderHook<string, readonly [string, (s: string) => void]>(() => useErrorClass(1000, 1000));
    expect(result.current[0]).toBe("");

    act(() => {
      result.current[1]("error");
    });
    expect(result.current[0]).toBe("error");

    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(result.current[0]).toBe("error fading");

    act(() => {
      jest.runAllTimers();
    });
    expect(result.current[0]).toBe("");
  });

  test("cancels timer on unmount", () => {
    const { result, unmount } = renderHook<string, readonly [string, (s: string) => void]>(() => useErrorClass());
    act(() => {
      result.current[1]("error");
    });
    expect(result.current[0]).toBe("error");

    unmount();
  });
});
