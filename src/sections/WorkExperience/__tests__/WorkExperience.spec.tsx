import { render, screen } from "@testing-library/react";

import WorkExperience from "../WorkExperience";

import { workExperienceItems } from "@/data";
import { sortByYear } from "@/utils/sortByYear";

describe("Section Work Experience", () => {
  it("renders work experience elements sorted by year", () => {
    render(<WorkExperience />);

    const sortedByYear = workExperienceItems.sort(sortByYear);
    const renderedItems = screen
      .getByTestId("work-experience-list")
      .querySelectorAll(":scope > li");

    sortedByYear.forEach(({ description, jobTitle }, i) => {
      expect(
        renderedItems[i]?.querySelector(".workExperienceItem__description"),
      ).toHaveTextContent(description);
      expect(
        renderedItems[i]?.querySelector(".workExperienceItem__jobTitle"),
      ).toHaveTextContent(jobTitle);
    });
  });
});
