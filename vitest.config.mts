import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      include: ["src/**/*"],
      reporter: ["text", "html"],
    },
    css: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "./e2e"],
    globals: true,
    reporters: ["default", "html"],
    setupFiles: ["./src/setupTests.ts"],
  },
});
