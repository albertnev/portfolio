import { render, screen, within } from "@testing-library/react";

import Header from "../Header";

import { menuEntries } from "@/components/MainMenu/MainMenu";

describe("Section Header", () => {
  it("renders the menu", () => {
    render(<Header />);

    const { getByText } = within(screen.getByTestId("menu-list"));
    menuEntries.forEach(({ title }) => {
      expect(getByText(title)).toBeInTheDocument();
    });
  });

  it("renders the social networks with their links", () => {
    render(<Header />);

    expect(screen.getByTestId("social-networks-list")).toBeInTheDocument();
    expect(screen.getByLabelText("Visit Albert's github page")).toHaveAttribute(
      "href",
      "https://github.com/albertnev",
    );
    expect(
      screen.getByLabelText("Visit Albert's linkedin page"),
    ).toHaveAttribute("href", "https://www.linkedin.com/in/albertnevado/");
  });

  it("renders link to portfolio code on Github", () => {
    render(<Header />);
    expect(document.querySelector(".header__portfolioLink a")).toHaveAttribute(
      "href",
      "https://github.com/albertnev/portfolio",
    );
  });

  it("renders attribution and credit links", () => {
    render(<Header />);
    expect(document.querySelector(".header__svgAttribution")).toHaveAttribute(
      "href",
      "https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/",
    );
  });
});
