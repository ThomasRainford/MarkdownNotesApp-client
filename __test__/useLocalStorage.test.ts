import { act, renderHook } from "@testing-library/react";
import useLocalStorage from "../utils/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    // Clear local storage before each test
    window.localStorage.clear();
  });

  it("returns the initial value if no value is in local storage", () => {
    const { result } = renderHook(() =>
      useLocalStorage("key", "initial value")
    );

    expect(result.current[0]).toBe("initial value");
  });

  it("returns the value from local storage if it exists", () => {
    window.localStorage.setItem("key", JSON.stringify("stored value"));

    const { result } = renderHook(() =>
      useLocalStorage("key", "initial value")
    );

    expect(result.current[0]).toBe("stored value");
  });

  it("updates the value in local storage when the setter function is called", () => {
    const { result } = renderHook(() =>
      useLocalStorage("key", "initial value")
    );

    act(() => {
      result.current[1]("new value");
    });

    expect(window.localStorage.getItem("key")).toBe(
      JSON.stringify("new value")
    );
  });
});
