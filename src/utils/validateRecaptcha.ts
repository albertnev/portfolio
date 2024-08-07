"use server";

import { type RecaptchaResponseDto } from "@/types/RecaptchaResponseDto";

export const validateRecaptcha = async (captcha = "") => {
  // Validate captcha with google servers
  const params = new URLSearchParams({
    response: captcha,
    secret: process.env.RECAPTCHA_SECRETKEY!,
  });

  try {
    const recaptchaValidationResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?${params}`,
      {
        method: "POST",
      },
    );
    const recaptchaValidation =
      (await recaptchaValidationResponse.json()) as RecaptchaResponseDto;

    if (!recaptchaValidation.success) {
      return {
        errors: {
          captcha: "Invalid captcha response.",
          captchaErrors: recaptchaValidation["error-codes"],
        },
        hasErrors: true,
      };
    }
  } catch (err) {
    return {
      errors: {
        captcha: "Error while validating captcha.",
        captchaErrors: [JSON.stringify(err)],
      },
      hasErrors: true,
    };
  }

  return { errors: {}, hasErrors: false };
};
