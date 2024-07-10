"use client";

import { useCallback, useState } from "react";
import { flushSync } from "react-dom";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { type z } from "zod";

import { type FormValidationResponse } from "@/types/FormValidation";

export const useForm = <FieldsType>(
  validateServerAction: (
    data: Record<string, string>,
  ) => Promise<FormValidationResponse<z.Schema>>,
  onSubmit?: (data: Record<string, string>) => Promise<void>,
  validateCaptcha = false,
) => {
  type ErrorsType = Partial<{
    [key in keyof FieldsType]: string[] | undefined;
  }>;

  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<ErrorsType>({});

  const validateAndSubmit = useCallback(
    async (formData: FormData) => {
      if (isPending) {
        // Avoid submitting twice
        return;
      }

      // Skip autobatching and force re-render to provide immediate feedback to the user
      flushSync(() => {
        setIsPending(true);
      });

      // Add validation captcha information if necessary
      if (validateCaptcha) {
        const recaptchaValidation =
          (await executeRecaptcha?.("formSubmit")) ?? "";
        formData.set("captcha", recaptchaValidation);
      }

      const data = Object.fromEntries(formData.entries()) as Record<
        string,
        string
      >; // no files so FormDataEntry type will always be string

      try {
        const { errors: validationErrors, hasErrors } =
          await validateServerAction(data);

        if (hasErrors) {
          setErrors(validationErrors as ErrorsType);
          return;
        }

        setErrors({});
        await onSubmit?.(data);
      } finally {
        // This will be called before any previous return
        setIsPending(false);
      }
    },
    [
      isPending,
      setIsPending,
      validateCaptcha,
      onSubmit,
      validateServerAction,
      executeRecaptcha,
    ],
  );

  return {
    errors,
    // hasErrors: !!Object.keys(errors).length,
    isPending,
    validateAndSubmit,
  };
};
