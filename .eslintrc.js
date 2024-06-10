const { resolve } = require("node:path");

const project = resolve(__dirname, "tsconfig.json");

module.exports = {
  extends: [
    "plugin:typescript-sort-keys/recommended",
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    "next/core-web-vitals",
    "prettier",
  ],
  parserOptions: {
    project,
  },
  plugins: ["typescript-sort-keys", "sort-destructure-keys"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0,
    "import/no-default-export": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.spec.ts",
          "**/*.config.ts",
          "**/*.spec.tsx",
          "**/setupTests.ts",
        ],
      },
    ],
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"],
          ["parent", "sibling", "index"],
        ],
        "newlines-between": "always",
      },
    ],
    "no-param-reassign": [
      "error",
      {
        ignorePropertyModificationsFor: ["immerDraft", "accu"],
        props: true,
      },
    ],
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "unicorn/filename-case": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
};
