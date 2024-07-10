import { render, screen } from "@testing-library/react";
import { FaTimes } from "react-icons/fa";

import { LinkButton } from "..";
import { type LinkButtonProps } from "../LinkButton";

describe("Component LinkButton", () => {
  const defaultProps: LinkButtonProps = {
    href: "http://my-link",
  };

  const renderWithProps = (
    props?: Partial<LinkButtonProps>,
    children: React.ReactNode = "Test text",
  ) => {
    return render(
      <LinkButton {...defaultProps} {...props}>
        {children}
      </LinkButton>,
    );
  };

  it("renders the component sucessfully", () => {
    renderWithProps();
    expect(screen.getByRole("link", { name: "Test text" })).toBeInTheDocument();
  });

  it("renders the provided children correctly", () => {
    renderWithProps(undefined, <>Component Children</>);
    expect(
      screen.getByRole("link", { name: "Component Children" }),
    ).toBeInTheDocument();
  });

  it("renders the provided icon", () => {
    renderWithProps({ icon: FaTimes });
    expect(screen.getByTestId("link-button-icon")).toBeInTheDocument();
  });
});
