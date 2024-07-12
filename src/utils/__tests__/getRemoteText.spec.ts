import { getRemoteText } from "../getRemoteText";

import { RemoteValues } from "@/enums/RemoteValues";

describe("Util getRemoteText", () => {
  it("returns the remote value correctly", () => {
    RemoteValues.forEach((val, key) => {
      expect(getRemoteText(key)).toEqual(val);
    });
  });

  it("returns a descriptive text if remote value is not found", () => {
    const nonExistingValue = "testingvalue";
    expect(getRemoteText(nonExistingValue)).toEqual(
      `Invalid value for remote field: ${nonExistingValue}`,
    );
  });
});
