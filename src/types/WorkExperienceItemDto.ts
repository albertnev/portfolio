import { type TechTypesKeys } from "@/enums/TechTypes";

export interface WorkExperienceItemDto {
  company: string;
  description: string;
  devops?: string;
  jobTitle: string;
  milestones?: string;
  projectManagement?: string;
  techStack: TechTypesKeys[];
  yearEnd?: number;
  yearStart: number;
}
