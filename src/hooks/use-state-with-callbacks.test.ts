import { act, renderHook } from "@testing-library/react-hooks";
import useStateWithCallback, { useStateWithCallbackInstant, useStateWithCallbackLazy } from "./use-state-with-callback";

test("useStateWithCallback", () => {
  const callback = jest.fn();
  const { result } = renderHook<number, readonly [number, React.Dispatch<number>]>(
                      () => useStateWithCallback(0, callback));
  expect(result.current[0]).toBe(0);
  expect(callback.mock.calls.length).toBe(1);
  act(() => {
    result.current[1](1);
  });
  expect(result.current[0]).toBe(1);
  expect(callback.mock.calls.length).toBe(2);
});

test("useStateWithCallbackInstant", () => {
  const callback = jest.fn();
  const { result } = renderHook<number, readonly [number, React.Dispatch<number>]>(
                      () => useStateWithCallbackInstant(0, callback));
  expect(result.current[0]).toBe(0);
  expect(callback.mock.calls.length).toBe(1);
  act(() => {
    result.current[1](1);
  });
  expect(result.current[0]).toBe(1);
  expect(callback.mock.calls.length).toBe(2);
});

test("useStateWithCallbackLazy", () => {
  const callback = jest.fn();
  const { result } = renderHook<number, readonly [number, (n: number, fn: ((n: number) => void)) => void]>(
                      () => useStateWithCallbackLazy(0));
  expect(result.current[0]).toBe(0);
  expect(callback.mock.calls.length).toBe(0);
  act(() => {
    result.current[1](1, callback);
  });
  expect(result.current[0]).toBe(1);
  expect(callback.mock.calls.length).toBe(1);
});
