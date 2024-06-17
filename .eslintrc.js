const { resolve } = require("node:path");

const project = resolve(__dirname, "tsconfig.json");

module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    "next/core-web-vitals",
    "plugin:typescript-sort-keys/recommended",
    "prettier",
  ],
  parserOptions: {
    project,
  },
  plugins: ["jsx-a11y", "typescript-sort-keys", "sort-destructure-keys"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/restrict-template-expressions": "off",
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
        packageDir: "./",
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
    "no-console": "warn",
    "no-implicit-coercion": ["error", { allow: ["!!"] }],
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
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
    "react/no-unescaped-entities": "off",
    "sort-destructure-keys/sort-destructure-keys": [
      2,
      {
        caseSensitive: false,
      },
    ],
    "sort-keys": [
      "error",
      "asc",
      {
        caseSensitive: false,
        minKeys: 2,
        natural: true,
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
