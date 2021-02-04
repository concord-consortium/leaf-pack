import { renderHook } from "@testing-library/react-hooks";
import { useSharedText } from "./use-shared-text";

const HookWrapper = () => useSharedText();

describe("useSharedText", () => {
  it("returns Hello World", () => {
    const { result } = renderHook(HookWrapper);
    expect(result.current).toEqual("Shared Text");
  });
});
