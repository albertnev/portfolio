import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { type AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import * as navigationModule from "next/navigation";

import ContactForm, { type ContactFormProps } from "../ContactForm";

import { mockExecuteRecaptcha } from "@/test-utils/mockExecuteRecaptcha";
import { type ContactFormDto } from "@/types/ContactFormDto";
import * as formValidationModule from "@/utils/formValidation";

describe("Section ContactForm", () => {
  const initialFormData: ContactFormDto = {
    company: "My company",
    email: "test@email.com",
    extras: "Test extras minimum text to be valid information during tests",
    job: "Test Job",
    name: "Test name",
    reasons: "Test reasons minimum text to be valid information during tests",
    remote: "full-remote",
    salary: "80000",
    seniority: "Senior",
    tasks: "Test tasks minimum text to be valid information during tests",
    vacationDays: "30",
  };

  const mockFinalFormValidation = (
    response = {
      errorMessage: "",
      errors: {},
      hasErrors: false,
    },
  ) => {
    vi.spyOn(
      formValidationModule,
      "validateAndSendContactForm",
    ).mockImplementation(async () => response);
  };

  const renderWithProps = (props?: Partial<ContactFormProps>) => {
    render(<ContactForm initialFormData={initialFormData} {...props} />);
  };

  beforeEach(() => {
    mockExecuteRecaptcha();
    mockFinalFormValidation();

    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn(),
      },
    });
  });

  it("displays the form successfully", () => {
    renderWithProps({ initialFormData: undefined });
    expect(
      screen.getByRole("heading", { name: "Company information" }),
    ).toBeVisible();
    expect(screen.getByText("Company information")).toBeInTheDocument();
    expect(screen.getByText("Job description")).toBeInTheDocument();
    expect(screen.getByText("Position information")).toBeInTheDocument();
  });

  it('allows to submit the form successfully displaying a "thank you" message when form has been successfully submitted', async () => {
    renderWithProps({ initialFormData: undefined });

    // Fill Company information form
    await userEvent.type(
      screen.getByLabelText("Which company do you represent?"),
      initialFormData.company,
    );
    await userEvent.type(
      screen.getByLabelText("What is your full name?"),
      initialFormData.name,
    );
    await userEvent.type(
      screen.getByLabelText("What is your contact e-mail?"),
      initialFormData.email,
    );
    await userEvent.click(screen.getByRole("button", { name: "Next" }));

    // Fill Position information form
    await userEvent.type(
      screen.getByLabelText("Job title"),
      initialFormData.job,
    );
    await userEvent.type(
      screen.getByLabelText("Needed seniority"),
      initialFormData.seniority,
    );
    await userEvent.type(
      screen.getByLabelText("Max. yearly salary (€)"),
      initialFormData.salary,
    );
    await userEvent.type(
      screen.getByLabelText("Yearly vacation days"),
      initialFormData.vacationDays,
    );
    await userEvent.click(screen.getByRole("button", { name: "Next" }));

    // Fill Job description form
    await userEvent.selectOptions(
      screen.getByRole("combobox", { name: "Remote modality" }),
      initialFormData.remote,
    );
    await userEvent.type(
      screen.getByLabelText(
        "Which tasks am I expected to do on a daily basis?",
      ),
      initialFormData.tasks,
    );
    await userEvent.type(
      screen.getByLabelText(
        "Why do you think I'm a good candidate for the offer?",
      ),
      initialFormData.reasons,
    );
    await userEvent.type(
      screen.getByLabelText("What are some extra points you can offer?"),
      initialFormData.extras,
    );
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText("Thank you for contacting me!"),
    ).toBeInTheDocument();
  }, 6500);

  it("displays the received error upon server validation, if any", async () => {
    const errorMessage = "Test form validation error.";
    mockFinalFormValidation({
      errorMessage,
      errors: [],
      hasErrors: true,
    });
    renderWithProps({ initialStep: 2 });
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it("allows to copy current form information if there is a server validation error", async () => {
    const errorMessage = "Test form validation error.";
    mockFinalFormValidation({
      errorMessage,
      errors: [],
      hasErrors: true,
    });
    renderWithProps({ initialStep: 2 });
    await userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText(/you can contact me using Linkedin network/),
    ).toBeInTheDocument();
    await act(async () => {
      await userEvent.click(
        screen.getByRole("button", { name: "copy your current data" }),
      );
    });
    expect(navigator.clipboard.writeText).toHaveBeenLastCalledWith(
      JSON.stringify(initialFormData),
    );
  });

  it("redirects to main page after some time when form has been successfully submitted", async () => {
    // Fix bug as userEvent uses jest advanceTimers methods
    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime.bind(vi),
    });

    const push = vi.fn(); // Re-mock: make sure we get the same instance as component
    vi.spyOn(navigationModule, "useRouter").mockImplementation(
      () =>
        ({
          push,
        }) as unknown as AppRouterInstance,
    );

    renderWithProps({ initialStep: 2 });
    vi.useFakeTimers();
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(push).not.toHaveBeenCalled();
    expect(
      await screen.findByText(/You are now being redirected/),
    ).toBeInTheDocument();

    vi.advanceTimersByTime(4100);
    expect(push).toHaveBeenLastCalledWith("/");

    vi.useRealTimers();
  });
});
