import { render, screen } from "@testing-library/react";

import Home from "../page";

import { menuEntries } from "@/components/MainMenu/MainMenu";

describe("Home page", () => {
  it("renders all sections", () => {
    render(<Home />);
    menuEntries.forEach((entry) => {
      expect(document.getElementById(entry.id)).toBeInTheDocument();
    });
  });

  it("renders main menu", () => {
    render(<Home />);
    menuEntries.forEach((entry) => {
      expect(
        screen.getByText(entry.title, {
          selector: 'ul[data-testid="menu-list"] li a',
        }),
      ).toBeInTheDocument();
    });
  });
});
