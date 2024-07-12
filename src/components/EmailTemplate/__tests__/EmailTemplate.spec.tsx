import { render, screen } from "@testing-library/react";

import EmailTemplate, { type EmailTemplateProps } from "../EmailTemplate";

import { getAmount } from "@/utils/getAmount";
import { getRemoteText } from "@/utils/getRemoteText";

// This will throw validateDOMNesting error, as <Preview /> (which is a <div />) is rendered outside of <Body />
describe("Component EmailTemplate", () => {
  const defaultProps = {
    company: "My company",
    email: "test@email.com",
    extras: "My test extras",
    job: "Test Job",
    name: "Test name",
    reasons: "My test reasons",
    remote: "full-remote",
    salary: "80000",
    seniority: "Senior",
    tasks: "My test tasks",
    vacationDays: "30",
  } satisfies EmailTemplateProps;

  const renderWithProps = (props?: Partial<EmailTemplateProps>) => {
    render(<EmailTemplate {...defaultProps} {...props} />);
  };

  it("renders the component successfully", () => {
    renderWithProps();

    expect(
      screen.getByText(
        `${defaultProps.job} offer for ${getAmount(defaultProps.salary)}`,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.company)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.extras)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.job)).toBeInTheDocument();
    expect(
      screen.getByText(`${defaultProps.name} (${defaultProps.email})`),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.reasons)).toBeInTheDocument();
    expect(
      screen.getByText(getRemoteText(defaultProps.remote)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(getAmount(defaultProps.salary)),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.seniority)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.tasks)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.vacationDays)).toBeInTheDocument();
  });
});
