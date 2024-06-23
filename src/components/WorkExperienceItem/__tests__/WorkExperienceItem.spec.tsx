import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { WorkExperienceItem } from "..";
import { type WorkExperienceItemProps } from "../WorkExperienceItem";

import { workExperienceItems } from "@/data";
import { TechTypes } from "@/enums/TechTypes";

describe("Component WorkExperienceItem", () => {
  const defaultProps: WorkExperienceItemProps = {
    ...workExperienceItems[0]!,
  };

  const openCollapsibleContent = async () => {
    await act(() => userEvent.click(screen.getByText("More about it")));
  };

  const getDateRange = (yearStart: number, yearEnd?: number) => {
    if (yearStart === yearEnd) {
      return `${yearStart}`;
    }

    return `${yearStart} — ${yearEnd ?? "Present"}`;
  };

  const renderWithProps = (props?: Partial<WorkExperienceItemProps>) => {
    return render(<WorkExperienceItem {...defaultProps} {...props} />);
  };

  it("renders the work item successfully", () => {
    renderWithProps();

    expect(screen.getByText(defaultProps.jobTitle)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${getDateRange(defaultProps.yearStart, defaultProps.yearEnd)} · ${defaultProps.company}`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it("renders 'Present' if there is no yearEnd", () => {
    renderWithProps({ yearEnd: undefined });
    expect(
      screen.getByText(
        `${getDateRange(defaultProps.yearStart, undefined)} · ${defaultProps.company}`,
      ),
    ).toBeInTheDocument();
  });

  it("renders milestones text if there are any", async () => {
    const milestones = "My milestones";
    renderWithProps({
      devops: undefined,
      milestones,
      projectManagement: undefined,
    });
    await openCollapsibleContent();
    expect(screen.getByText(milestones)).toBeInTheDocument();
  });

  it("renders devops text if there are any", async () => {
    const devops = "My devops";
    renderWithProps({
      devops,
      milestones: undefined,
      projectManagement: undefined,
    });
    await openCollapsibleContent();
    expect(screen.getByText(devops)).toBeInTheDocument();
  });

  it("renders project management text if there are any", async () => {
    const projectManagement = "My project management";
    renderWithProps({
      devops: undefined,
      milestones: undefined,
      projectManagement,
    });
    await openCollapsibleContent();
    expect(screen.getByText(projectManagement)).toBeInTheDocument();
  });

  it("does not render the collapsible content if there are no milestones, no devops and no project management texts", () => {
    renderWithProps({
      devops: undefined,
      milestones: undefined,
      projectManagement: undefined,
    });

    expect(screen.queryByText("More about it")).not.toBeInTheDocument();
  });

  it("renders the list of technologies specified", () => {
    renderWithProps();

    defaultProps.techStack.forEach((tech) => {
      expect(screen.getByText(TechTypes[tech])).toBeInTheDocument();
    });
  });
});
