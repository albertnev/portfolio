import * as recaptchaModule from "react-google-recaptcha-v3";

export const mockExecuteRecaptcha = (
  recaptchaValue = "test-recaptcha-value-for-testing",
) => {
  vi.spyOn(recaptchaModule, "useGoogleReCaptcha").mockReturnValue({
    executeRecaptcha: vi.fn().mockReturnValue(recaptchaValue),
  });

  return recaptchaValue;
};
