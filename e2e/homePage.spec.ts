import { expect, test } from "@playwright/test";

import { menuEntries } from "@/components/MainMenu/MainMenu";
import { hobbiesCollections } from "@/data";

test.describe("Portfolio", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test.describe("Common view for all devices", () => {
    test("has the right title and description", async ({ page }) => {
      await expect(page).toHaveTitle("Albert Nevado - Portfolio");

      const metaDescription = page.locator('meta[name="description"]');
      await expect(metaDescription).toHaveAttribute(
        "content",
        "A senior frontend developer's portfolio. If you're hiring, take a look and contact me!",
      );
    });

    test("section content is hidden in first render when scrolling to it, and fades in after a short period of time", async ({
      page,
    }) => {
      // First page load: first section to appear is About
      await expect(page.locator("#about")).not.toHaveCSS("opacity", "1");
      // auto-await until it's visible after a short amount of time
      await expect(page.locator("#about")).toHaveCSS("opacity", "1");

      // Scroll to another section and check behaviour
      await page.locator("#work-experience").scrollIntoViewIfNeeded();
      await expect(page.locator("#work-experience")).not.toHaveCSS(
        "opacity",
        "1",
      );
      await expect(page.locator("#work-experience")).toHaveCSS("opacity", "1");
    });

    test.describe("Work experience section", () => {
      const itemLocator = ".workExperienceItem__container";

      test.beforeEach(async ({ page }) => {
        await page.goto("/#work-experience");
        await expect(page.locator("#work-experience")).toHaveCSS(
          "opacity",
          "1",
        );
      });

      test("displays a glass background and the title highlighted in the item on hover", async ({
        page,
      }) => {
        await page.waitForSelector(itemLocator);
        const element = page
          .locator(itemLocator)
          .filter({ hasText: "Present · Mimacom" });
        await element.hover();
        await page.waitForTimeout(350); // Await for background animation to finish
        // Screenshot displays glass background and title highlighted
        await expect(element).toHaveScreenshot(
          "workExperienceItem-onHover.png",
        );
      });

      test("the features 'More about it' part is hidden by default, and displays more content when clicking on its toggle button", async ({
        page,
      }) => {
        // await page.waitForSelector(itemLocator);
        const element = page
          .locator(itemLocator)
          .filter({ hasText: "Present · Mimacom" });
        const featuresElement = element.locator(
          `.workExperienceItem__featuresContainer`,
        );

        await expect(featuresElement).not.toBeVisible();
        await element.getByText("More about it").click();
        await expect(featuresElement).toBeVisible();
      });
    });

    test.describe("Image gallery", () => {
      test.beforeEach(async ({ page }) => {
        await page.goto("/#hobbies");
        await expect(page.locator("#hobbies")).toHaveCSS("opacity", "1");
      });

      test("images in the gallery section display a loader before image has ended loading", async ({
        page,
      }) => {
        // Slow down image request to have time to display loader
        await page.route(/image/, async (route) => {
          await new Promise((f) => {
            setTimeout(f, 3000);
          });
          await route.continue();
        });
        // Reload page so that page.route delay takes effect
        await page.reload();
        await page.locator("#hobbies").scrollIntoViewIfNeeded();

        await expect(page.getByTestId("loading-spinner").first()).toBeVisible({
          timeout: 2000,
        });
        await expect(
          page.getByTestId("loading-spinner").first(),
        ).not.toBeVisible({ timeout: 7000 });
      });

      test("clicking an image in the gallery opens a popup with the images slideshow, and it closes when pressing the close icon button", async ({
        page,
      }) => {
        const selectedCollection = hobbiesCollections[0]!;
        await page
          .getByTestId(`collection-${selectedCollection.title}`)
          .getByTestId("image-gallery-trigger")
          .click();

        await expect(page.getByTestId("image-gallery-modal")).toBeVisible();
        await page.getByTestId("image-gallery-modal-close").click();
        await expect(page.getByTestId("image-gallery-modal")).not.toBeVisible();
      });

      test("allows to navigate between images in the image slideshow", async ({
        page,
      }) => {
        const selectedCollection = hobbiesCollections[0]!;
        await page
          .getByTestId(`collection-${selectedCollection.title}`)
          .getByTestId("image-gallery-trigger")
          .click();

        const galleryModal = page.getByTestId("image-gallery-modal");
        await expect(galleryModal).toBeVisible();

        // Display 1st image on open
        await expect(
          galleryModal.getByAltText(selectedCollection.images[0]!.description),
        ).toBeVisible();

        // Display 2nd image
        await galleryModal.getByTestId("image-gallery-next").click();
        await expect(
          galleryModal.getByAltText(selectedCollection.images[1]!.description),
        ).toBeVisible();

        // Display 3rd image
        await galleryModal.getByTestId("image-gallery-next").click();
        await expect(
          galleryModal.getByAltText(selectedCollection.images[2]!.description),
        ).toBeVisible();

        // Display again 2nd image
        await galleryModal.getByTestId("image-gallery-previous").click();
        await expect(
          galleryModal.getByAltText(selectedCollection.images[1]!.description),
        ).toBeVisible();
      });
    });
  });

  test.describe("@mobile view", () => {
    test("nav menu is closed by default, and it opens when triggering the toggle button", async ({
      page,
    }) => {
      await expect(page.getByTestId("menu-open-button")).toBeVisible();
      await expect(
        page.getByTestId("menu-open-button").locator("span"),
      ).toContainText("About me");

      await page.getByTestId("menu-open-button").click();
      await expect(page.getByTestId("menu-close-button")).toBeVisible();
      await Promise.all(
        menuEntries.map(async (menuEntry) => {
          return expect(page.getByTestId("menu-list")).toContainText(
            menuEntry.title,
          );
        }),
      );
    });

    test("clicking on a menu entry scrolls to the clicked section and displays the menu entry as active", async ({
      page,
    }) => {
      await page.getByTestId("menu-open-button").click();
      await page.getByRole("link", { name: "Work experience" }).click();
      await expect(
        page
          .getByTestId("menu-list")
          .locator("li")
          .filter({ has: page.getByRole("link", { name: "Work experience" }) }),
      ).toHaveClass(/active/);
      await expect(page.locator("#work-experience")).toBeInViewport();
    });

    test("accessing the page with the # of a section scrolls automatically to that section and sets the menu entry as active", async ({
      page,
    }) => {
      await page.goto("/#education");
      await expect(page.locator("#education")).toBeInViewport();

      await page.getByTestId("menu-open-button").click();
      await expect(
        page
          .getByTestId("menu-list")
          .locator("li")
          .filter({ has: page.getByRole("link", { name: "Education" }) }),
      ).toHaveClass(/active/);
    });

    test("scrolling through the page sections sets the title of the menu to the current displayed section", async ({
      page,
    }) => {
      await page.locator("#work-experience").scrollIntoViewIfNeeded();
      await expect(page.getByTestId("menu-open-button")).toHaveText(
        "Work experience",
      );

      await page.getByTestId("menu-open-button").click();
      await expect(
        page
          .getByTestId("menu-list")
          .locator("li")
          .filter({ has: page.getByRole("link", { name: "Work experience" }) }),
      ).toHaveClass(/active/);
    });
  });

  test.describe("@desktop view", () => {
    test("nav menu is visible", async ({ page }) => {
      await expect(page.getByTestId("menu-open-button")).not.toBeVisible();
      await Promise.all(
        menuEntries.map(async (menuEntry) => {
          return expect(page.getByTestId("menu-list")).toContainText(
            menuEntry.title,
          );
        }),
      );
    });

    test("clicking on a menu entry scrolls to the clicked section and displays the menu entry as active", async ({
      page,
    }) => {
      await page.getByRole("link", { name: "Work experience" }).click();
      await expect(
        page
          .getByTestId("menu-list")
          .locator("li")
          .filter({ has: page.getByRole("link", { name: "Work experience" }) }),
      ).toHaveClass(/active/);
      await expect(page.locator("#work-experience")).toBeInViewport();
    });

    test("accessing the page with the # of a section scrolls automatically to that section and sets the menu entry as active", async ({
      page,
    }) => {
      await page.goto("/#education");
      await expect(page.locator("#education")).toBeInViewport();
      await expect(
        page
          .getByTestId("menu-list")
          .locator("li")
          .filter({ has: page.getByRole("link", { name: "Education" }) }),
      ).toHaveClass(/active/);
    });

    test("scrolling through the page sections sets the corresponding menu entry as active when it enters in the viewport", async ({
      page,
    }) => {
      await page.locator("#work-experience").scrollIntoViewIfNeeded();
      await expect(
        page
          .getByTestId("menu-list")
          .locator("li")
          .filter({ has: page.getByRole("link", { name: "Work experience" }) }),
      ).toHaveClass(/active/);
    });

    test("hovering over the tech stack icons makes them float", async ({
      page,
    }) => {
      await page.locator("#skill-set").scrollIntoViewIfNeeded();
      const skillElement = page.getByTestId("skill-Html");
      await skillElement.hover();
      await page.waitForTimeout(350);

      await expect(skillElement.getByRole("img")).toHaveCSS(
        "transform",
        "matrix(1, 0, 0, 1, 0, -12)",
      );

      // Check translation and shadow by screenshot
      await expect(skillElement).toHaveScreenshot("skillElement-onHover.png");
    });
  });
});
