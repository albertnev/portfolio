import { clsx } from "clsx";
import { FaNetworkWired } from "react-icons/fa6";
import { GrDeploy } from "react-icons/gr";
import { LuMilestone } from "react-icons/lu";

import { CollapsibleContent } from "../CollapsibleContent";
import { GlassBackground } from "../GlassBackground";
import { TechPill } from "../TechPill";

import { type FCProps } from "@/types/FCProps";
import { type WorkExperienceItemDto } from "@/types/WorkExperienceItemDto";

export interface WorkExperienceItemProps
  extends FCProps,
    WorkExperienceItemDto {}

const WorkExperienceItem: React.FC<WorkExperienceItemProps> = ({
  className = "",
  company,
  description,
  devops,
  jobTitle,
  milestones,
  projectManagement,
  techStack,
  yearEnd,
  yearStart,
}) => {
  const getDateRange = () => {
    if (yearStart === yearEnd) {
      return `${yearStart}`;
    }

    return `${yearStart} — ${yearEnd ?? "Present"}`;
  };

  return (
    <div
      className={clsx(
        "workExperienceItem__container relative group",
        className,
      )}
    >
      <GlassBackground />
      <div className="relative z-20">
        <div>
          <span className="text-sm font-bold opacity-70">
            {getDateRange()} · {company}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1 group-hover:text-cyan-200">
            {jobTitle}
          </h3>
          {!!description && <p>{description}</p>}
          {(!!milestones || !!devops || !!projectManagement) && (
            <CollapsibleContent className="my-4">
              <ul className="workExperienceItem__featuresContainer flex flex-col space-y-2 pl-2 [&>li]:text-sm [&>li]:flex [&>li]:items-center [&>li_svg]:mr-4 [&>li_svg]:shrink-0">
                {!!milestones && (
                  <li data-testid="work-experience-milestone">
                    <LuMilestone title="Milestones" /> <span>{milestones}</span>
                  </li>
                )}
                {!!devops && (
                  <li data-testid="work-experience-devops">
                    <GrDeploy title="Devops workflow" /> <span>{devops}</span>
                  </li>
                )}
                {!!projectManagement && (
                  <li data-testid="work-experience-project-management">
                    <FaNetworkWired title="Project management characteristics" />{" "}
                    <span>{projectManagement}</span>
                  </li>
                )}
              </ul>
            </CollapsibleContent>
          )}
        </div>
        <ul className="mt-3 flex flex-row flex-wrap">
          {techStack.map((tech) => (
            <li key={tech} className="mt-2 mr-2">
              <TechPill tech={tech} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkExperienceItem;
