import { render, screen } from "@testing-library/react";

import Education from "../Education";

import { educationItems } from "@/data";
import { sortByYear } from "@/utils/sortByYear";

describe("Section Education", () => {
  it("renders education elements sorted by year", () => {
    render(<Education />);

    const sortedByYear = educationItems.sort(sortByYear);
    const renderedItems = screen
      .getByTestId("education-list")
      .querySelectorAll(":scope > li");

    sortedByYear.forEach(({ school, title, yearEnd, yearStart }, i) => {
      expect(
        renderedItems[i]?.querySelector(".educationItem__year"),
      ).toHaveTextContent(`${yearStart} — ${yearEnd}`);
      expect(
        renderedItems[i]?.querySelector(".educationItem__school"),
      ).toHaveTextContent(school);
      expect(
        renderedItems[i]?.querySelector(".educationItem__title"),
      ).toHaveTextContent(title);
    });
  });
});
