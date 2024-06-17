import { type KeyboardEvent } from "react";

export const handleAccessibleKeyPress = (
  e: KeyboardEvent<HTMLElement>,
  callback: () => void,
) => {
  if (e.key === "Enter" || e.key === "Space") {
    callback();
    return true;
  }

  return false;
};
