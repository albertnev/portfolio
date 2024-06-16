import { clsx } from "clsx";

import { TechPill } from "../TechPill";

import { type FCProps } from "@/types/FCProps";
import { type WorkExperienceItemDto } from "@/types/WorkExperienceItemDto";
import { FaNetworkWired } from "react-icons/fa6";
import { GrDeploy } from "react-icons/gr";
import { LuMilestone } from "react-icons/lu";
import { CollapsibleContent } from "../CollapsibleContent";

interface WorkExperienceItemProps extends FCProps, WorkExperienceItemDto {}

const WorkExperienceItem: React.FC<WorkExperienceItemProps> = ({
  className = "",
  company,
  description,
  jobTitle,
  devops,
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
    <div className={clsx("relative group", className)}>
      <div className="absolute z-10 hidden group-hover:block shadow-lg shadow-black/30 rounded-md backdrop-blur-sm -inset-x-6 -inset-y-6 bg-cyan-700/10 animate-in group-hover:zoom-in-50 duration-30 overflow-hidden">
        <div className="absolute z-20 bg-white/60 opacity-5 left-1/2 h-full w-2/3 -skew-x-12 border-2 border-l-0 border-white" />
      </div>
      <div className="relative z-30">
        <div>
          <span className="text-sm font-bold opacity-70">
            {getDateRange()} · {company}
          </span>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-1 group-hover:text-cyan-200">
            {jobTitle}
          </h4>
          {!!description && <p>{description}</p>}
          {(!!milestones || !!devops || !!projectManagement) && (
            <CollapsibleContent className="my-4">
              <ul className="flex flex-col space-y-2 pl-2 [&>li]:text-sm [&>li]:flex [&>li]:items-center [&>li_svg]:mr-4 [&>li_svg]:shrink-0">
                {!!milestones && (
                  <li>
                    <LuMilestone title="Milestones" /> <span>{milestones}</span>
                  </li>
                )}
                {!!devops && (
                  <li>
                    <GrDeploy title="Devops workflow" /> <span>{devops}</span>
                  </li>
                )}
                {!!projectManagement && (
                  <li>
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
