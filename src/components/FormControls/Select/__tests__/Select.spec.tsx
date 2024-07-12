import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Select } from "..";
import { type SelectProps } from "../Select";

describe("FormControl Select", () => {
  const defaultProps = {
    label: "Test select",
    name: "test",
    placeholder: "Test",
  } satisfies SelectProps;

  const defaultOptions = ["Option 1", "Option 2", "Option 3"];

  const renderWithProps = (props?: Partial<SelectProps>) => {
    render(
      <Select {...defaultProps} {...props}>
        {defaultOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </Select>,
    );
  };

  it("renders the component successfully", () => {
    renderWithProps();
    expect(screen.getByLabelText(defaultProps.label)).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: defaultProps.label }),
    ).toBeInTheDocument();
  });

  it("renders the placeholder as a first option if provided", async () => {
    renderWithProps();

    await userEvent.click(screen.getByRole("combobox"));
    const placeholderOption = screen.getByText(defaultProps.placeholder);
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toHaveValue("");
  });

  it("allows changing its value", async () => {
    renderWithProps();

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, defaultOptions[1]!);
    expect(select).toHaveDisplayValue(defaultOptions[1]!);
  });

  it("displays the first of the provided errors and shows visual feedback", () => {
    const errors = ["Test error", "Second error"];
    renderWithProps({ errors });

    expect(screen.getByText(errors[0]!)).toBeInTheDocument();
    expect(screen.queryByText(errors[1]!)).not.toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveClass("border-red-100");
  });

  it("does not allow to change value if it is disabled", async () => {
    renderWithProps({ disabled: true });
    const select = screen.getByRole("combobox");

    await userEvent.selectOptions(select, defaultOptions[1]!);
    expect(select).toHaveValue("");
  });
});
