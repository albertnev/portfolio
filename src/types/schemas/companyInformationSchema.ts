import { z } from "zod";

export const companyInformationSchema = z.object({
  company: z
    .string()
    .min(2, { message: "I need to know you are not an evil company!" }),
  email: z
    .string()
    .min(5, { message: "Without this, it will be hard to answer!" })
    .email("Please, make sure this is a valid e-mail."),
  name: z.string().min(2, {
    message: "I need to know who I will be talking to!",
  }),
});
