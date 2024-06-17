import { type KeyboardEvent } from "react";

import { handleAccessibleKeyPress } from "../handleAccessibleKeyPress";

describe("Util handleAccessibleKeyPress", () => {
  const getKeyboardEvent = (key: string) => {
    return { key } as KeyboardEvent<HTMLElement>;
  };

  it("executes callback if key pressed is Enter", () => {
    const callback = vi.fn();
    handleAccessibleKeyPress(getKeyboardEvent("Enter"), callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("executes callback if key pressed is Space", () => {
    const callback = vi.fn();
    handleAccessibleKeyPress(getKeyboardEvent("Space"), callback);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("does not execute callback if key pressed is different than Enter or Space", () => {
    const callback = vi.fn();
    handleAccessibleKeyPress(getKeyboardEvent("A"), callback);
    expect(callback).not.toHaveBeenCalled();
  });
});
