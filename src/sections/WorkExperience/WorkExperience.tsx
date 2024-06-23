import { SectionWrapper } from "@/components/SectionWrapper";
import { WorkExperienceItem } from "@/components/WorkExperienceItem";
import { workExperienceItems } from "@/data";
import { sortByYear } from "@/utils/sortByYear";

const WorkExperience = () => {
  return (
    <SectionWrapper id="work-experience" title="Work experience">
      <ol
        className="workExperience__list flex flex-col space-y-12"
        data-testid="work-experience-list"
      >
        {workExperienceItems
          .slice()
          .sort(sortByYear)
          .map((workItem) => (
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
