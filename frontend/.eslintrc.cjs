module.exports = {
  plugins: ["@typescript-eslint", "simple-import-sort", "import", "react"],
  parser: "@typescript-eslint/parser",
  root: true,
  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "no-undef": "off",
      },
    },
  ],
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
  ],
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
  },
};
