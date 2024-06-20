import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { type ImageProps } from "next/image";
import { type SyntheticEvent } from "react";

import { ImageWithLoader } from "..";

const imageOnLoadTimeout = 200;
const invokeImageWithProps = vi.fn();
vi.mock("next/image", () => ({
  default: (props: ImageProps) => {
    invokeImageWithProps(props);

    // Wait some time and call onLoad
    setTimeout(() => {
      props.onLoad?.({} as SyntheticEvent<HTMLImageElement>);
    }, imageOnLoadTimeout);
    return <div>Mocked image</div>;
  },
}));

describe("Component ImageWithLoader", () => {
  const defaultProps: ImageProps = {
    alt: "Test image",
    height: 300,
    loading: "eager",
    src: "/images/test.png",
    width: 300,
  };

  const renderWithProps = (props?: Partial<ImageProps>) => {
    return render(<ImageWithLoader {...defaultProps} {...props} />);
  };

  const runAllTimers = () => {
    act(() => {
      vi.advanceTimersByTime(imageOnLoadTimeout);
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the image with all the provided props", () => {
    const extraProps = {
      "aria-description": "test description",
      priority: true,
      quality: 75,
      title: "test title",
    };
    renderWithProps(extraProps);

    expect(
      screen.getByText(`Loading image ${extraProps.title}...`),
    ).toBeInTheDocument();
    expect(invokeImageWithProps).toHaveBeenLastCalledWith(
      expect.objectContaining({ ...defaultProps, ...extraProps }),
    );

    // Avoid updating state on timeout completion once test is over
    cleanup();
  });

  it("renders a 'Loading image' accessible text if title is not defined", () => {
    renderWithProps({ title: undefined });

    expect(screen.getByText(`Loading image...`)).toBeInTheDocument();

    // Avoid updating state on timeout completion once test is over
    cleanup();
  });

  it("renders the loading spinner until the image has finished loading", async () => {
    vi.useFakeTimers();

    renderWithProps();
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    runAllTimers();

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });
  });

  it("executes the provided onLoad method when the image has finished loading", async () => {
    const onLoad = vi.fn();
    vi.useFakeTimers();

    renderWithProps({ onLoad });
    runAllTimers();

    await waitFor(() => {
      expect(onLoad).toHaveBeenCalledWith({});
    });
  });
});
