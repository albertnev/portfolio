import { render, screen } from "@testing-library/react";

import { ContactHeader } from "..";

describe("Section ContactHeader", () => {
  it("renders the component successfully", () => {
    render(<ContactHeader />);

    expect(screen.getByText("Go back to Portfolio")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Go back to Portfolio" }),
    ).toHaveAttribute("href", "/");
  });
});
