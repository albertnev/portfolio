import { render, screen } from "@testing-library/react";

import { SocialNetworks } from "..";

describe("Component SocialNetworks", () => {
  const defaultProps = {
    networks: [],
  };

  const renderWithProps = (props?: typeof defaultProps) => {
    return render(<SocialNetworks {...defaultProps} {...props} />);
  };

  it("renders only the specified networks", () => {
    renderWithProps();
    expect(screen.getByText("SocialNetworks")).toBeInTheDocument();
  });
});
