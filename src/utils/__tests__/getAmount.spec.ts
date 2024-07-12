import { getAmount } from "../getAmount";

describe("Util getAmount", () => {
  it("returns amount correctly formatted with thousands separator and default currency to €", () => {
    expect(getAmount(80000)).toEqual("80.000 €");
    expect(getAmount("80000")).toEqual("80.000 €");
    expect(getAmount(123456789)).toEqual("123.456.789 €");
    expect(getAmount("123456789")).toEqual("123.456.789 €");
  });

  it("returns empty string if no amount is provided", () => {
    expect(getAmount()).toEqual("");
  });

  it("returns formatted value with provided currency", () => {
    expect(getAmount(12, "$")).toEqual("12 $");
  });
});
