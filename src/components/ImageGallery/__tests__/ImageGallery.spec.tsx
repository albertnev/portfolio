import { act, render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { ImageGallery } from "..";
import { type ImageGalleryProps } from "../ImageGallery";

import { hobbiesCollections } from "@/data";

describe("Component ImageGallery", () => {
  const defaultProps: ImageGalleryProps = {
    collections: hobbiesCollections,
  };

  const renderWithProps = (props?: Partial<ImageGalleryProps>) => {
    return render(<ImageGallery {...defaultProps} {...props} />);
  };

  const openCollectionModal = async (
    collection: (typeof hobbiesCollections)[0] = hobbiesCollections[0]!,
  ) => {
    const img = collection.images.at(-1)!;

    await act(async () => {
      await userEvent.click(screen.getByAltText(img.description));
    });

    await waitFor(() => {
      expect(screen.getByTestId("image-gallery-modal")).toBeInTheDocument();
    });
  };

  it("renders the last image of every collection as a list", () => {
    renderWithProps();

    defaultProps.collections.forEach((col) => {
      const img = col.images.at(-1)!;
      const imgElement = screen.getByAltText(img.description);
      expect(imgElement).toBeInTheDocument();
      expect(imgElement).toHaveAttribute(
        "src",
        expect.stringContaining(encodeURIComponent(img.src)),
      );
    });
  });

  it("displays the series name and title in the list on hover", async () => {
    renderWithProps();

    const collection = defaultProps.collections[0]!;
    const img = collection.images.at(-1)!;

    await act(async () => {
      await userEvent.hover(screen.getByAltText(img.description));
    });

    expect(screen.getByText(collection.title)).toBeInTheDocument();
    expect(screen.getByText(collection.series)).toBeInTheDocument();
  });

  it("opens the image viewer modal when collection thumbnail is clicked and displays the first image", async () => {
    renderWithProps();
    const collection = defaultProps.collections[0]!;
    await openCollectionModal();

    await waitFor(() => {
      expect(
        screen.getByAltText(collection.images[0]!.description),
      ).toBeVisible();
    });
  });

  it("changes images when pressing next and previous arrows in image gallery", async () => {
    renderWithProps();

    const collection = defaultProps.collections[0]!;
    await openCollectionModal();

    const { getByAltText, getByTestId } = within(
      screen.getByTestId("image-gallery-modal"),
    );

    await waitFor(() => {
      expect(getByAltText(collection.images[0]!.description)).toBeVisible();
    });

    await act(async () => {
      await userEvent.click(getByTestId("image-gallery-next"));
    });

    await waitFor(() => {
      expect(getByAltText(collection.images[1]!.description)).toBeVisible();
    });

    await act(async () => {
      await userEvent.click(getByTestId("image-gallery-previous"));
    });

    await waitFor(() => {
      expect(getByAltText(collection.images[0]!.description)).toBeVisible();
    });
  });

  it("does not show previous image button when the image shown is the first one", async () => {
    renderWithProps();
    await openCollectionModal();

    const { queryByTestId } = within(screen.getByTestId("image-gallery-modal"));

    expect(queryByTestId("image-gallery-previous")).not.toBeInTheDocument();
  });

  it("does not show next image button when the image shown is the last one", async () => {
    renderWithProps();

    const collection = defaultProps.collections[0]!;
    await openCollectionModal(collection);

    const { queryByAltText, queryByTestId } = within(
      screen.getByTestId("image-gallery-modal"),
    );

    for await (const img of collection.images.slice(0, -1)) {
      await act(async () => {
        await userEvent.click(queryByTestId("image-gallery-next")!);
      });
      // eslint-disable-next-line -- Expect is a globally available testing function
      await waitFor(() => {
        expect(queryByAltText(img.description)).not.toBeVisible();
      });
    }

    await waitFor(() => {
      expect(queryByTestId("image-gallery-next")).not.toBeInTheDocument();
    });
  });

  it("closes the image viewer modal when pressing the Close icon", async () => {
    renderWithProps();
    await openCollectionModal();

    const { getByTestId } = within(screen.getByTestId("image-gallery-modal"));

    await act(async () => {
      await userEvent.click(getByTestId("image-gallery-modal-close"));
    });

    await waitFor(() => {
      expect(
        screen.queryByTestId("image-gallery-modal"),
      ).not.toBeInTheDocument();
    });
  });
});
