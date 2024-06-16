import { type WorkExperienceItemDto } from "@/types/WorkExperienceItemDto";

export const sortWorkExperiences = (
  a: WorkExperienceItemDto,
  b: WorkExperienceItemDto,
) => {
  if (!b.yearEnd) {
    return 1;
  }

  if (!a.yearEnd) {
    return -1;
  }

  return b.yearStart - a.yearStart;
};
