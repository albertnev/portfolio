import { render, screen } from "@testing-library/react";

import { EducationItem } from "..";
import { type EducationItemProps } from "../EducationItem";

import { educationItems } from "@/data";

describe("Component EducationItem", () => {
  const defaultProps: EducationItemProps = {
    ...(educationItems[1] as EducationItemProps),
  };

  const renderWithProps = (props?: Partial<EducationItemProps>) => {
    return render(<EducationItem {...defaultProps} {...props} />);
  };

  it("renders the component sucessfully with the content hidden by default", () => {
    renderWithProps();
    expect(
      screen.getByText(`${defaultProps.yearStart} — ${defaultProps.yearEnd}`),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.school)).toBeInTheDocument();
  });
});
