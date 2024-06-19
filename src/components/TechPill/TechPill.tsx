import { TechIcons } from "@/enums/TechIcons";
import { TechTypes, type TechTypesKeys } from "@/enums/TechTypes";
import { type FCProps } from "@/types/FCProps";

interface TechPillProps extends FCProps {
  tech: TechTypesKeys;
}

const TechPill: React.FC<TechPillProps> = ({ className, tech }) => {
  const TechIcon = TechIcons[tech];

  return (
    <span
      className={`p-2 inline-flex items-center justify-center border-cyan-200 border whitespace-nowrap px-4 rounded-md text-xs bg-cyan-700 bg-opacity-40 text-cyan-200 ${className}`}
    >
      <TechIcon className="inline-block mr-2 text-base" />{" "}
      <span>{TechTypes[tech]}</span>
    </span>
  );
};

export default TechPill;
