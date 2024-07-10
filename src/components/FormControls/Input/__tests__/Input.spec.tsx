import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Input } from "..";
import { type InputProps } from "../Input";

describe("FormControl Input", () => {
  const defaultProps = {
    label: "Test input",
    name: "test",
    placeholder: "Test",
  } satisfies InputProps;

  const renderWithProps = (props?: Partial<InputProps>) => {
    render(<Input {...defaultProps} {...props} />);
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

  it("defaults its type to text", () => {
    renderWithProps();
    expect(
      screen.getByRole("textbox", { name: defaultProps.label }),
    ).toHaveAttribute("type", "text");
  });

  it("accepts other input types", async () => {
    renderWithProps({ type: "email" });
    const input = screen.getByRole("textbox", { name: defaultProps.label });
    expect(input).toHaveAttribute("type", "email");

    await userEvent.type(input, "abc");
    expect(input).toBeInvalid();
  });

  it("displays the first of the provided errors and shows visual feedback", () => {
    const errors = ["Test error", "Second error"];
    renderWithProps({ errors });

    expect(screen.getByText(errors[0]!)).toBeInTheDocument();
    expect(screen.queryByText(errors[1]!)).not.toBeInTheDocument();
  });

  it("does not allow to change value if it is disabled", async () => {
    renderWithProps({ disabled: true });
    const input = screen.getByRole("textbox", { name: defaultProps.label });

    await userEvent.type(input, "abc");
    expect(input).toHaveValue("");
  });
});
