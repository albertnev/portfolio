import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Textarea } from "..";
import { type TextareaProps } from "../Textarea";

describe("FormControl Textarea", () => {
  const defaultProps = {
    label: "Test textarea",
    name: "test",
    placeholder: "Test",
  } satisfies TextareaProps;

  const renderWithProps = (props?: Partial<TextareaProps>) => {
    render(<Textarea {...defaultProps} {...props} />);
  };

  it("renders the component successfully", () => {
    renderWithProps();
    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(defaultProps.placeholder),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: defaultProps.label }),
    ).toBeInTheDocument();
  });

  it("allows changing its value", async () => {
    renderWithProps();

    const text = "My text";
    const textarea = screen.getByRole("textbox");
    await userEvent.type(textarea, text);
    expect(textarea).toHaveDisplayValue(text);
  });

  it("displays the first of the provided errors and shows visual feedback", () => {
    const errors = ["Test error", "Second error"];
    renderWithProps({ errors });

    expect(screen.getByText(errors[0]!)).toBeInTheDocument();
    expect(screen.queryByText(errors[1]!)).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveClass("border-red-100");
  });

  it("does not allow to change value if it is disabled", async () => {
    renderWithProps({ disabled: true });
    const textarea = screen.getByRole("textbox", { name: defaultProps.label });

    await userEvent.type(textarea, "abc");
    expect(textarea).toHaveValue("");
  });
});
