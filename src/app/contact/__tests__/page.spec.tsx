import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import Contact from "../page";

describe("Contact page", () => {
  it("renders the form and the header", () => {
    render(<Contact />);
    expect(screen.getByText("Go back to Portfolio")).toBeInTheDocument();
    expect(screen.getByText("Company information")).toBeVisible();
    expect(screen.getByText("Position information")).toBeInTheDocument();
    expect(screen.getByText("Position information")).not.toBeVisible();
    expect(screen.getByText("Job description")).toBeInTheDocument();
    expect(screen.getByText("Job description")).not.toBeVisible();
  });

  it("allows to go to next step if form data is valid, and back to previous step", async () => {
    render(<Contact />);
    expect(screen.getByText("Company information")).toBeVisible();

    // Fill form with valid data
    await userEvent.type(
      screen.getByLabelText("Which company do you represent?"),
      "Company",
    );
    await userEvent.type(
      screen.getByLabelText("What is your complete name?"),
      "Name Surname",
    );
    await userEvent.type(
      screen.getByLabelText("Which is your contact e-mail?"),
      "email@test.com",
    );

    // Go to next step
    await userEvent.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByText("Company information")).not.toBeVisible();
    expect(screen.getByText("Position information")).toBeVisible();

    // Go back to previous step
    await userEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(screen.getByText("Company information")).toBeVisible();
    expect(screen.getByText("Position information")).not.toBeVisible();
  });
});
