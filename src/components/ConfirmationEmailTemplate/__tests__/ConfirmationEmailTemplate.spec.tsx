import { render, screen } from "@testing-library/react";

import { ConfirmationEmailTemplate } from "..";

// This will throw validateDOMNesting error, as <Preview /> (which is a <div />) is rendered outside of <Body />
describe("Component ConfirmationEmailTemplate", () => {
  it("renders the no-reply disclaimer", () => {
    render(<ConfirmationEmailTemplate />);
    expect(
      screen.getByText(
        "This is just a confirmation e-mail. Please, do not respond.",
      ),
    ).toBeInTheDocument();
  });

  it("renders the link to the portfolio", () => {
    render(<ConfirmationEmailTemplate />);
    expect(
      screen.getByRole("link", { name: "in my portfolio" }),
    ).toHaveAttribute("href", "https://albertnev.vercel.app/");
  });
});
