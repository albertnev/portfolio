import { type z } from "zod";

export interface FormValidationResponse<T extends z.Schema> {
  errors: z.typeToFlattenedError<T>["fieldErrors"];
  // errors: Partial<Record<keyof T, string[] | undefined>>;
  hasErrors: boolean;
}

// export type FormValidation<T> = (
//   formData: FormData,
//   schema: z.Schema,
// ) => Promise<FormValidationResponse<T>>;
