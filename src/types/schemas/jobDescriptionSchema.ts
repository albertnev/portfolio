import { z } from "zod";

export const jobDescriptionSchema = z.object({
  captcha: z.string().min(1, {
    message: "Are you a robot? Incorrect captcha validation. Please try again.",
  }),
  extras: z.string(),
  reasons: z
    .string()
    .min(9, {
      message: "At least, write something!",
    })
    .or(z.literal("something")),
  remote: z
    .string({ required_error: "Select one option!" })
    .refine((val) => ["full-remote", "1-office", "2-office"].includes(val), {
      message: "Remote came to stay! Select less office days.",
    }),
  tasks: z
    .string()
    .min(30, {
      message: "I also accept drinking coffee the whole day!",
    })
    .or(z.literal("Drinking coffee the whole day!")),
});
