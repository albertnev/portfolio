import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { JobDescription } from "..";

import { mockExecuteRecaptcha } from "@/test-utils/mockExecuteRecaptcha";
import sleep from "@/test-utils/sleep";
import { type FormStepProps } from "@/types/FormStepProps";
import { getRemoteText } from "@/utils/getRemoteText";

describe("ContactForm Step JobDescription", () => {
  const defaultProps = {
    id: "test-step",
    isActive: true,
  } satisfies FormStepProps;

  const fillFormInformation = async (
    values = {
      extras: "Test extras minimum text to be valid information during tests",
      reasons: "Test reasons minimum text to be valid information during tests",
      remote: "full-remote",
      tasks: "Test tasks minimum text to be valid information during tests",
    },
  ) => {
    const { extras, reasons, remote, tasks } = values;

    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "Remote modality" }),
      remote,
    );
    await userEvent.type(
      screen.getByLabelText(
        "Which tasks am I expected to do on a daily basis?",
      ),
      tasks,
    );
    await userEvent.type(
      screen.getByLabelText(
        "Why do you think I'm a good candidate for the offer?",
      ),
      reasons,
    );
    await userEvent.type(
      screen.getByLabelText("What are some extra points you can offer?"),
      extras,
    );

    return values;
  };

  const renderWithProps = (props?: Partial<FormStepProps>) => {
    render(<JobDescription {...defaultProps} {...props} />);
  };

  it("renders the step and its fields correctly", () => {
    renderWithProps();
    expect(
      screen.getByRole("heading", { name: "Job description" }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText("Remote modality")).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        "Which tasks am I expected to do on a daily basis?",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        "Why do you think I'm a good candidate for the offer?",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("What are some extra points you can offer?"),
    ).toBeInTheDocument();
  });

  it("renders the form hidden if isActive is provided as false", () => {
    renderWithProps({ isActive: false });
    expect(screen.getByText("Job description")).not.toBeVisible();
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
      extras: "Test extras minimum text to be valid information during tests",
      reasons: "Test reasons minimum text to be valid information during tests",
      remote: "full-remote",
      tasks: "Test tasks minimum text to be valid information during tests",
    };
    renderWithProps({ initialFormData });

    expect(
      screen.getByRole("combobox", { name: "Remote modality" }),
    ).toHaveDisplayValue(getRemoteText(initialFormData.remote));
    expect(
      screen.getByLabelText(
        "Which tasks am I expected to do on a daily basis?",
      ),
    ).toHaveDisplayValue(initialFormData.tasks);
    expect(
      screen.getByLabelText(
        "Why do you think I'm a good candidate for the offer?",
      ),
    ).toHaveDisplayValue(initialFormData.reasons);
    expect(
      screen.getByLabelText("What are some extra points you can offer?"),
    ).toHaveDisplayValue(initialFormData.extras);
  });
});
