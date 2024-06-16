import { SectionWrapper } from "@/components/SectionWrapper";
import SkillItem from "@/components/SkillItem/SkillItem";
import { skillsets } from "@/data";

const Skillset = () => {
  return (
    <SectionWrapper id="skillset" title="Skillset">
      <ul className="grid grid-cols-3 gap-x-5 gap-y-8 md:grid-cols-4  lg:gap-x-8 lg:gap-y-10">
        {skillsets
          .sort((a, b) => b.level - a.level)
          .map(({ level, skill }) => {
            return (
              <li key={skill}>
                <SkillItem level={level} skill={skill} />
              </li>
            );
          })}
      </ul>
    </SectionWrapper>
  );
};

export default Skillset;
