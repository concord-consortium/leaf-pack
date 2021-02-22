import { act, renderHook } from "@testing-library/react-hooks";
import { useErrorClass } from "./use-error-class";

describe("useErrorClass", () => {

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("works as expected", () => {
    const { result } = renderHook<string, readonly [string, (s: string) => void]>(() => useErrorClass());
    expect(result.current[0]).toBe("");

    act(() => {
      result.current[1]("error");
    });
    expect(result.current[0]).toBe("error");

    act(() => {
      jest.runAllTimers();
    });
    expect(result.current[0]).toBe("error fading");

    act(() => {
      result.current[1]("");
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
