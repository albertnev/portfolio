import { render, screen } from "@testing-library/react";

import { SocialNetworks } from "..";
import { type SocialNetworksProps } from "../SocialNetworks";

describe("Component SocialNetworks", () => {
  const defaultProps: SocialNetworksProps = {
    networks: [
      {
        link: "http://github",
        type: "github",
      },
      {
        link: "http://instagram",
        type: "instagram",
      },
      {
        link: "http://linkedin",
        type: "linkedin",
      },
    ],
  };

  const renderWithProps = (props?: Partial<SocialNetworksProps>) => {
    return render(<SocialNetworks {...defaultProps} {...props} />);
  };

  it("renders all the available networks if specified", () => {
    renderWithProps();
    defaultProps.networks.forEach(({ link, type }) => {
      expect(
        screen.getByLabelText(`Visit Albert's ${type} page`),
      ).toBeInTheDocument();
      expect(
        screen.getByLabelText(`Visit Albert's ${type} page`),
      ).toHaveAttribute("href", link);
    });
  });

  it("renders only the specified networks", () => {
    const network = {
      link: "http://instagram",
      type: "instagram",
    } as SocialNetworksProps["networks"][0];
    renderWithProps({ networks: [network] });

    expect(
      screen.getByLabelText(`Visit Albert's ${network.type} page`),
    ).toBeInTheDocument();
    expect(
      screen.queryByLabelText(`Visit Albert's github page`),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(`Visit Albert's linkedin page`),
    ).not.toBeInTheDocument();
  });
});
