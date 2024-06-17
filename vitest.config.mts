import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    css: true,
    environment: "jsdom",
    globals: true,
    exclude: [...configDefaults.exclude, "./e2e"],
    setupFiles: ["./src/setupTests.ts"],
  },
});
