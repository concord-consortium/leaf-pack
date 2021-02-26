import { renderHook } from "@testing-library/react-hooks";
import { hashString, useHashedStrings } from "./use-hashed-strings";

describe("useHashedStrings", () => {

  test("handles an empty array", () => {
    const { result } = renderHook(() => useHashedStrings([]));
    expect(Object.keys(result.current).length).toBe(0);
  });

  test("handles unique strings", () => {
    const { result } = renderHook(() =>
      useHashedStrings(["string1", "string2", "string3"]));
    expect(Object.keys(result.current).length).toBe(3);
  });

  test("handles duplicate strings", () => {
    const { result } = renderHook(() =>
      useHashedStrings(["string1", "string2", "string3", "string1", "string2", "string3"]));
    expect(Object.keys(result.current).length).toBe(3);
  });

  test("provides access to hash function", () => {
    const str = "string1";
    const { result } = renderHook(() =>
      useHashedStrings([str]));
    const key = hashString(str);
    expect(result.current[key]).toBe(str);
  });

});
