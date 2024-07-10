import { render, screen } from "@testing-library/react";
import {
  PointerEventsCheckLevel,
  userEvent,
} from "@testing-library/user-event";

import { Form } from "..";
import { type FormProps } from "../Form";

import { Input } from "@/components/FormControls/Input";

describe("Component Form", () => {
  const defaultProps: FormProps = {
    id: "test-form",
    isActive: true,
  };

  const renderWithProps = (
    props?: Partial<FormProps>,
    children: React.ReactNode = <Input label="Test input" name="test" />,
  ) => {
    render(
      <Form {...defaultProps} {...props}>
        {children}
      </Form>,
    );
  };

  it("renders the form successfully with its children", () => {
    renderWithProps(undefined, <Input label="My test input" name="test" />);
    expect(screen.getByLabelText("My test input")).toBeInTheDocument();
  });

  it("renders the form hidden if isActive is provided as false", () => {
    renderWithProps({ isActive: false });
    // getByRole does not return elements hidden by CSS
    expect(document.querySelector("form")).not.toBeVisible();
  });

  it("renders the form visible if isActive is provided as true", () => {
    renderWithProps({ isActive: true });
    expect(screen.getByRole("form")).toBeVisible();
  });

  it("blocks user from interacting with form if isPending is provided as true", async () => {
    const props = { isPending: true, onNext: vi.fn() };
    renderWithProps(props);

    await userEvent.click(screen.getByRole("button", { name: "Next" }), {
      pointerEventsCheck: PointerEventsCheckLevel.Never,
    });

    expect(props.onNext).not.toHaveBeenCalled();
  });

  it("displays the provided legend as a title", () => {
    const legend = "My form";
    renderWithProps({ legend });
    expect(screen.getByRole("heading", { name: legend })).toBeInTheDocument();
  });

  it("renders the Back button if onBack callback is provided and executes it on click", async () => {
    const props = { onBack: vi.fn() };
    renderWithProps(props);

    const button = screen.getByRole("button", { name: "Back" });
    expect(button).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Submit" }),
    ).not.toBeInTheDocument();

    await userEvent.click(button);
    expect(props.onBack).toHaveBeenCalled();
  });

  it("renders the Next button if onNext callback is provided and executes it on click", async () => {
    const props = { onNext: vi.fn() };
    renderWithProps(props);

    await userEvent.type(screen.getByRole("textbox"), "My test");

    const button = screen.getByRole("button", { name: "Next" });
    expect(
      screen.queryByRole("button", { name: "Back" }),
    ).not.toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Submit" }),
    ).not.toBeInTheDocument();

    const formData = new FormData();
    formData.set("test", "My test");

    await userEvent.click(button);
    expect(props.onNext).toHaveBeenCalledWith(formData);
  });

  it("renders the Submit button if onSubmit callback is provided and executes it on click", async () => {
    const props = { onSubmit: vi.fn() };
    renderWithProps(props);

    await userEvent.type(screen.getByRole("textbox"), "My test");

    const button = screen.getByRole("button", { name: "Submit" });
    expect(
      screen.queryByRole("button", { name: "Back" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Next" }),
    ).not.toBeInTheDocument();
    expect(button).toBeInTheDocument();

    const formData = new FormData();
    formData.set("test", "My test");

    await userEvent.click(button);
    expect(props.onSubmit).toHaveBeenCalledWith(formData);
  });
});
