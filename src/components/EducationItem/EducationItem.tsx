import { clsx } from "clsx";

import { GlassBackground } from "../GlassBackground";

import { type EducationItemDto } from "@/types/EducationItemDto";
import { type FCProps } from "@/types/FCProps";

interface EducationItemProps extends FCProps, EducationItemDto {}

const EducationItem: React.FC<EducationItemProps> = ({
  className = "",
  school,
  title,
  yearEnd,
  yearStart,
}) => {
  return (
    <div className={clsx("relative group", className)}>
      <GlassBackground />
      <div className="relative z-20">
        <div>
          <span className="text-sm font-bold opacity-70">
            {`${yearStart} — ${yearEnd}`}
          </span>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-1 group-hover:text-cyan-200">
            {title}
          </h4>
        </div>
        <div>
          <span className="text-sm font-bold opacity-70">{school}</span>
        </div>
      </div>
    </div>
  );
};

export default EducationItem;
