import { render, screen } from "@testing-library/react";

import { LoadingSpinner } from "..";
import { type LoadingSpinnerProps } from "../LoadingSpinner";

describe("Component LoadingSpinner", () => {
  const renderWithProps = (props?: Partial<LoadingSpinnerProps>) => {
    return render(<LoadingSpinner {...props} />);
  };

  it("renders the loading spinner successfully", () => {
    renderWithProps();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByText("Loading...")).toHaveClass("sr-only");
  });

  it("renders the accessible description provided", () => {
    const accessibleDescription = "Accessible description";
    renderWithProps({ accessibleDescription });
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    expect(screen.getByText(`${accessibleDescription}...`)).toBeInTheDocument();
    expect(screen.getByText(`${accessibleDescription}...`)).toHaveClass(
      "sr-only",
    );
  });
});
