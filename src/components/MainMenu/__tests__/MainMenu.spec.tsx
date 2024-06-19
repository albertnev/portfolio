import { render, screen, within } from "@testing-library/react";

import { MainMenu } from "..";
import { menuEntries } from "../MainMenu";

describe("Component MainMenu", () => {
  const MockIntersectionObserver = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
  }));
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

  const renderWithProps = () => {
    return render(<MainMenu />);
  };

  it("renders the menu entries successfully", () => {
    renderWithProps();
    const { getByText } = within(screen.getByTestId("menu-list"));

    menuEntries.forEach((entry) => {
      expect(getByText(entry.title)).toBeInTheDocument();
    });
  });

  it("sets the About section as active by default", () => {
    renderWithProps();
    const { getByText } = within(screen.getByTestId("menu-list"));
    expect(getByText("About me").closest("li")).toHaveStyle(`
      font-weight: 700;
      opacity: 1;
    `);
  });
});
