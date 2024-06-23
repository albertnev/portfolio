import { clsx } from "clsx";

import { GlassBackground } from "../GlassBackground";

import { type EducationItemDto } from "@/types/EducationItemDto";
import { type FCProps } from "@/types/FCProps";

export interface EducationItemProps extends FCProps, EducationItemDto {}

const EducationItem: React.FC<EducationItemProps> = ({
  className = "",
  school,
  title,
  yearEnd,
  yearStart,
}) => {
  return (
    <div className={clsx("educationItem__container relative group", className)}>
      <GlassBackground />
      <div className="relative z-20">
        <div>
          <span className="educationItem__year text-sm font-bold opacity-70">
            {`${yearStart} — ${yearEnd}`}
          </span>
        </div>
        <div>
          <h4 className="educationItem__title text-lg font-bold mb-1 group-hover:text-cyan-200">
            {title}
          </h4>
        </div>
        <div>
          <span className="educationItem__school text-sm font-bold opacity-70">
            {school}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EducationItem;
