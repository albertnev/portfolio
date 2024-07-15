import { z } from "zod";

export const positionInformationSchema = z.object({
  job: z.string().min(2, {
    message:
      "Unlike Chandler Bing, I'd like to be able to tell the name of my job!",
  }),
  salary: z.coerce.number().min(55000, {
    message: "Living is so expensive these days!",
  }),
  seniority: z.string().min(5, {
    message: "This fields helps me see if I may fit!",
  }),
  vacationDays: z.coerce.number().min(24, {
    message: "Sometimes people need a well deserved rest!",
  }),
});
