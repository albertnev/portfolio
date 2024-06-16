import { type TechTypesKeys } from "@/enums/TechTypes";

export interface WorkExperienceItemDto {
  company: string;
  description?: string;
  jobTitle: string;
  milestones?: string;
  devops?: string;
  projectManagement?: string;
  techStack: TechTypesKeys[];
  yearEnd?: number;
  yearStart: number;
}
