import { clsx } from "clsx";

import { type EducationItemDto } from "@/types/EducationItemDto";
import { type FCProps } from "@/types/FCProps";
import { GlassBackground } from "../GlassBackground";

interface EducationItemProps extends FCProps, EducationItemDto {}

const EducationItem: React.FC<EducationItemProps> = ({
  className = "",
  title,
  school,
  yearEnd,
  yearStart,
}) => {
  return (
    <div className={clsx("relative group", className)}>
      <GlassBackground />
      <div className="relative z-30">
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
