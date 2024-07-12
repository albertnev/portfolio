import { type z } from "zod";

import { type companyInformationSchema } from "./schemas/companyInformationSchema";
import { type jobDescriptionSchema } from "./schemas/jobDescriptionSchema";
import { type positionInformationSchema } from "./schemas/positionInformationSchema";

type SchemasUnion = z.infer<typeof companyInformationSchema> &
  Omit<z.infer<typeof jobDescriptionSchema>, "captcha"> &
  z.infer<typeof positionInformationSchema>;

export type ContactFormDto = Record<keyof SchemasUnion, string>;
