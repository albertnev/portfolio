import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { CollapsibleContent } from "..";
import { type CollapsibleContentProps } from "../CollapsibleContent";

describe("Component CollapsibleContent", () => {
  const defaultProps: CollapsibleContentProps = {};

  const renderWithProps = (
    props?: Partial<CollapsibleContentProps>,
    children: React.ReactNode = "Test content",
  ) => {
    return render(
      <CollapsibleContent {...defaultProps} {...props}>
        {children}
      </CollapsibleContent>,
    );
  };

  it("renders the component sucessfully with the content hidden by default", () => {
    renderWithProps();
    expect(screen.getByText("See more")).toBeInTheDocument();
    expect(screen.getByText("Test content")).not.toBeVisible();
  });

  it("renders the component sucessfully with the content shown if specified", () => {
    renderWithProps({ shownByDefault: true });
    expect(screen.getByText("See more")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeVisible();
  });

  it("renders the provided title", () => {
    renderWithProps({ title: "More info" });
    expect(screen.getByText("More info")).toBeInTheDocument();
    expect(screen.queryByText("See more")).not.toBeInTheDocument();
  });

  it("displays the contents when clicked on the title", async () => {
    renderWithProps(undefined, <p>This is my content</p>);
    expect(screen.getByText("This is my content")).not.toBeVisible();

    await act(() => userEvent.click(screen.getByText("See more")));
    expect(screen.getByText("This is my content")).toBeVisible();
  });
});
