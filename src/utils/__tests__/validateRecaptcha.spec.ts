import createFetchMock from "vitest-fetch-mock";

import { validateRecaptcha } from "../validateRecaptcha";

describe("Util validateRecaptcha", () => {
  const mockValidationResponse = (
    response: { "error-codes"?: string[]; success: boolean } = {
      success: true,
    },
  ) => {
    fetchMock.mockIf(/recaptcha\/api\/siteverify/, () => ({
      body: JSON.stringify(response),
    }));
  };

  beforeEach(() => {
    const fetchMock = createFetchMock(vi);
    fetchMock.enableMocks();
  });

  it("returns hasErrors property to false if there are no errors in the validation call", async () => {
    mockValidationResponse();
    expect(await validateRecaptcha("test-captcha")).toEqual({
      errors: {},
      hasErrors: false,
    });
  });

  it("returns hasErrors property to true and the captchaErrors returned by the validation call", async () => {
    const errorCodes = ["first error code", "second error code"];
    mockValidationResponse({
      "error-codes": errorCodes,
      success: false,
    });
    expect(await validateRecaptcha("test-captcha")).toEqual({
      errors: {
        captcha: "Invalid captcha response.",
        captchaErrors: errorCodes,
      },
      hasErrors: true,
    });
  });
});
