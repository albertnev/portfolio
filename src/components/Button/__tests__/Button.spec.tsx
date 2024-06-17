import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { FaTimes } from "react-icons/fa";

import { Button } from "..";
import { type ButtonProps } from "../Button";

describe("Component Button", () => {
  const defaultProps: ButtonProps = {
    onClick: vi.fn(),
  };

  const renderWithProps = (
    props?: Partial<ButtonProps>,
    children: React.ReactNode = "Test text",
  ) => {
    return render(
      <Button {...defaultProps} {...props}>
        {children}
      </Button>,
    );
  };

  it("renders the component sucessfully", () => {
    renderWithProps();
    expect(
      screen.getByText("Test text", { selector: "button span" }),
    ).toBeInTheDocument();
  });

  it("renders the provided children correctly", () => {
    renderWithProps(undefined, <>Component Children</>);
    expect(
      screen.getByText("Component Children", { selector: "button span" }),
    ).toBeInTheDocument();
  });

  it("renders the provided icon", () => {
    renderWithProps({ icon: FaTimes });
    expect(screen.getByTestId("button-icon")).toBeInTheDocument();
  });

  it("executes the provided onClick method when clicked", async () => {
    renderWithProps(undefined, "Clickable");
    await act(() => userEvent.click(screen.getByText("Clickable")));
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
