import { render, screen } from "@testing-library/react";

import { SkillItem } from "..";
import { type SkillItemProps } from "../SkillItem";

import { TechTypes } from "@/enums/TechTypes";

describe("Component SkillItem", () => {
  const defaultProps: SkillItemProps = {
    level: 3,
    skill: "Git",
  };

  const renderWithProps = () => {
    return render(<SkillItem {...defaultProps} />);
  };

  it("renders the component successfully", () => {
    renderWithProps();
    expect(
      screen.getByTestId(`skill-${defaultProps.skill}`),
    ).toBeInTheDocument();
    expect(screen.getByText(TechTypes[defaultProps.skill])).toBeInTheDocument();
  });

  it("renders skill level with circles", () => {
    renderWithProps();

    [...Array(5).keys()].forEach((i) => {
      expect(
        screen.getByTestId(`skill-${defaultProps.skill}-level-${i}`),
      ).toHaveStyle(
        i + 1 <= defaultProps.level
          ? { backgroundColor: "rgb(8, 145, 178 / 1)" }
          : { backgroundColor: "rgb(0, 0, 0 / 0)" }, // jsdom translates "transparent" to this
      );
    });
  });
});
