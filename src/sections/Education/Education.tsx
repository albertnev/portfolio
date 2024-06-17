import { EducationItem } from "@/components/EducationItem";
import { SectionWrapper } from "@/components/SectionWrapper";
import { educationItems } from "@/data";
import { sortByYear } from "@/utils/sortByYear";

const Education = () => {
  return (
    <SectionWrapper id="education" title="Education">
      <ol className="flex flex-col space-y-12">
        {educationItems
          .slice()
          .sort(sortByYear)
          .map((educationItem) => (
            <li
              key={`${educationItem.yearStart}-${educationItem.title}-${educationItem.school}`}
            >
              <EducationItem {...educationItem} />
            </li>
          ))}
      </ol>
    </SectionWrapper>
  );
};

export default Education;
