import { clsx } from "clsx";

import { TechIcons } from "@/enums/TechIcons";
import { TechTypes, type TechTypesKeys } from "@/enums/TechTypes";
import { type FCProps } from "@/types/FCProps";

export interface SkillItemProps extends FCProps {
  level: number;
  skill: TechTypesKeys;
}

const SkillItem: React.FC<SkillItemProps> = ({ level, skill }) => {
  const SkillIcon = TechIcons[skill];

  return (
    <div
      className="group flex flex-col justify-center gap-2 flex-wrap items-center"
      data-testid={`skill-${skill}`}
    >
      <SkillIcon className="skillItem__icon relative text-4xl transition-all duration-500 group-hover:-translate-y-3 group-hover:drop-shadow-hard" />
      <span className="skillItem__name">{TechTypes[skill]}</span>
      <ul
        className="skillItem__levels flex flex-row gap-1"
        data-testid={`skill-${skill}-level`}
      >
        {[...Array(5).keys()].map((i) => (
          <li
            key={`skill-${skill}-level-${i}`}
            className={clsx("w-2 h-2 border border-cyan-200 rounded-full", {
              "bg-cyan-600": i + 1 <= level,
              "bg-transparent": i + 1 > level,
            })}
            data-testid={`skill-${skill}-level-${i}`}
          />
        ))}
      </ul>
    </div>
  );
};

export default SkillItem;
