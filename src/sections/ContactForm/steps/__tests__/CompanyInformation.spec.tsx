import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { CompanyInformation } from "..";

import { mockExecuteRecaptcha } from "@/test-utils/mockExecuteRecaptcha";
import sleep from "@/test-utils/sleep";
import { type FormStepProps } from "@/types/FormStepProps";

describe("ContactForm Step CompanyInformation", () => {
  const defaultProps = {
    id: "test-step",
    isActive: true,
  } satisfies FormStepProps;

  const fillFormInformation = async (
    values = {
      company: "Company",
      email: "email@test.com",
      name: "Name",
    },
  ) => {
    const { company, email, name } = values;

    await userEvent.type(
      screen.getByLabelText("Which company do you represent?"),
      company,
    );
    await userEvent.type(
      screen.getByLabelText("What is your full name?"),
      name,
    );
    await userEvent.type(
      screen.getByLabelText("What is your contact e-mail?"),
      email,
    );

    return values;
  };

  const renderWithProps = (props?: Partial<FormStepProps>) => {
    render(<CompanyInformation {...defaultProps} {...props} />);
  };

  it("renders the step and its fields correctly", () => {
    renderWithProps();
    expect(
      screen.getByRole("heading", { name: "Company information" }),
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Which company do you represent?"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("What is your full name?"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("What is your contact e-mail?"),
    ).toBeInTheDocument();
  });

  it("renders the form hidden if isActive is provided as false", () => {
    renderWithProps({ isActive: false });
    expect(screen.getByText("Company information")).not.toBeVisible();
  });

  it("disables the form when it is executing the validateAndSubmit inner method", async () => {
    renderWithProps({
      onNext: vi.fn().mockImplementation(async () => {
        await sleep(100);
      }),
    });

    await fillFormInformation();

    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(document.querySelector("form")).toHaveStyle({
      pointerEvents: "none",
    });
  });

  it("renders the Back button if onBack callback is provided and executes it on click", async () => {
    const props = { onBack: vi.fn() };
    renderWithProps(props);

    const button = screen.getByRole("button", { name: "Back" });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(props.onBack).toHaveBeenCalled();
  });

  it("renders the Next button if onNext callback is provided and executes it on click", async () => {
    const props = { onNext: vi.fn() };
    renderWithProps(props);

    const values = await fillFormInformation();
    const button = screen.getByRole("button", { name: "Next" });

    expect(button).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Submit" }),
    ).not.toBeInTheDocument();

    await userEvent.click(button);
    expect(props.onNext).toHaveBeenCalledWith(values);
  });

  it("renders the Submit button if onSubmit callback is provided and executes it on click", async () => {
    const props = { onSubmit: vi.fn() };
    renderWithProps(props);

    const values = await fillFormInformation();
    const button = screen.getByRole("button", { name: "Submit" });

    expect(
      screen.queryByRole("button", { name: "Next" }),
    ).not.toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(props.onSubmit).toHaveBeenCalledWith(values);
  });

  it("renders only the Submit button if onSubmit and onNext callback are provided", async () => {
    const props = { onNext: vi.fn(), onSubmit: vi.fn() };
    renderWithProps(props);

    const values = await fillFormInformation();
    const button = screen.getByRole("button", { name: "Submit" });

    expect(
      screen.queryByRole("button", { name: "Next" }),
    ).not.toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(props.onSubmit).toHaveBeenCalledWith(values);
    expect(props.onNext).not.toHaveBeenCalled();
  });

  it("executes captcha validation if validateCaptcha prop is provided as true", async () => {
    const recaptcha = mockExecuteRecaptcha();
    const props = { onSubmit: vi.fn(), validateCaptcha: true };
    renderWithProps(props);

    await fillFormInformation();
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(props.onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ captcha: recaptcha }),
    );
  });

  it("renders default values correctly if provided in initialFormData", () => {
    const initialFormData = {
      company: "Company",
      email: "email@test.com",
      name: "Name",
    };
    renderWithProps({ initialFormData });

    expect(
      screen.getByLabelText("Which company do you represent?"),
    ).toHaveDisplayValue(initialFormData.company);
    expect(screen.getByLabelText("What is your full name?")).toHaveDisplayValue(
      initialFormData.name,
    );
    expect(
      screen.getByLabelText("What is your contact e-mail?"),
    ).toHaveDisplayValue(initialFormData.email);
  });
});
