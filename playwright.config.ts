import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  forbidOnly: Boolean(process.env.CI),
  fullyParallel: true,
  projects: [
    {
      grepInvert: /@mobile/,
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      grepInvert: /@mobile/,
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      grepInvert: /@mobile/,
      name: "microsoft-edge",
      use: { ...devices["Desktop Edge"], channel: "msedge" },
    },
    {
      grepInvert: /@desktop/,
      name: "mobile-chrome",
      use: { ...devices["Pixel 5"] },
    },
  ],
  reporter: "html",
  retries: process.env.CI ? 2 : 1,
  snapshotPathTemplate:
    "{snapshotDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}{ext}",
  testDir: "./e2e",
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3000",
    extraHTTPHeaders: {
      "x-vercel-protection-bypass":
        process.env.VERCEL_AUTOMATION_BYPASS_SECRET ?? "",
    },
    trace: "on-first-retry",
  },
  workers: 1,
});
