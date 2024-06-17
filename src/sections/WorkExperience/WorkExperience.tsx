import { SectionWrapper } from "@/components/SectionWrapper";
import { WorkExperienceItem } from "@/components/WorkExperienceItem";
import { workExperienceItems } from "@/data";
import { sortByYear } from "@/utils/sortByYear";

const WorkExperience = () => {
  return (
    <SectionWrapper id="work-experience" title="Work experience">
      <ol className="flex flex-col space-y-12">
        {workExperienceItems.sort(sortByYear).map((workItem) => (
          <li
            key={`${workItem.yearStart}-${workItem.jobTitle}-${workItem.company}`}
          >
            <WorkExperienceItem {...workItem} />
          </li>
        ))}
      </ol>
    </SectionWrapper>
  );
};

export default WorkExperience;
