import { SectionWrapper } from "@/components/SectionWrapper";
import { SkillItem } from "@/components/SkillItem";
import { skillsets } from "@/data";

const Skillset = () => {
  return (
    <SectionWrapper id="skill-set" title="Skillset">
      <ul
        className="skillset__list grid grid-cols-3 gap-x-5 gap-y-8 md:grid-cols-4 lg:gap-x-8 lg:gap-y-10"
        data-testid="skillset-list"
      >
        {skillsets
          .slice()
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
