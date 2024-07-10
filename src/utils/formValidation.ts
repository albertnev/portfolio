"use server";

import { type z } from "zod";

import { sendFormEmail } from "./sendFormEmail";
import { validateRecaptcha } from "./validateRecaptcha";

import { companyInformationSchema } from "@/types/schemas/companyInformationSchema";
import { jobDescriptionSchema } from "@/types/schemas/jobDescriptionSchema";
import { positionInformationSchema } from "@/types/schemas/positionInformationSchema";

const validateFormFields = async (
  data: Record<string, string>,
  validationSchema: z.Schema,
) => {
  const validatedFields = validationSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      hasErrors: true,
    };
  }

  return { errors: {}, hasErrors: false };
};

// Server actions do not accept Schemas as parameters from client components
export const validateCompanyInformation = async (
  data: Record<string, string>,
) => {
  return validateFormFields(data, companyInformationSchema);
};

export const validateJobDescription = async (data: Record<string, string>) => {
  return validateFormFields(data, jobDescriptionSchema);
};

export const validatePositionInformation = async (
  data: Record<string, string>,
) => {
  return validateFormFields(data, positionInformationSchema);
};

export const validateAndSendContactForm = async (
  data: Record<string, string>,
) => {
  // Extra validation to avoid data modification
  const formValidation = await validateFormFields(
    data,
    companyInformationSchema
      .extend(jobDescriptionSchema.shape)
      .extend(positionInformationSchema.shape),
  );

  // If there are (new) validation errors, return them
  if (formValidation.hasErrors) {
    return {
      ...formValidation,
      errorMessage:
        "Please, review your submitted information in previous steps.",
    };
  }

  // Validate recaptcha information
  const captchaValidation = await validateRecaptcha(data.captcha ?? "");
  if (captchaValidation.hasErrors) {
    return {
      ...captchaValidation,
      errorMessage:
        "You failed the Turing test. If you're not a robot, please, try again.",
    };
  }

  // Validation and recaptcha done: send email
  const emailResult = await sendFormEmail(data);
  if (emailResult.hasErrors) {
    return {
      ...emailResult,
      errorMessage: "E-mailing process failed.",
    };
  }

  return {
    errorMessage: undefined,
    errors: {},
    hasErrors: false,
  };
};
