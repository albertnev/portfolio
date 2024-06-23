import { render, screen } from "@testing-library/react";

import Skillset from "../Skillset";

import { skillsets } from "@/data";
import { TechTypes } from "@/enums/TechTypes";

describe("Section Skill Set", () => {
  it("renders skill set elements sorted by year", () => {
    render(<Skillset />);

    const sorted = skillsets.sort((a, b) => b.level - a.level);
    const renderedItems = screen
      .getByTestId("skillset-list")
      .querySelectorAll(":scope > li");

    sorted.forEach(({ skill }, i) => {
      expect(
        renderedItems[i]?.querySelector(".skillItem__name"),
      ).toHaveTextContent(TechTypes[skill]);
    });
  });
});
