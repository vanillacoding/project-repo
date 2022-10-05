module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "standard",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        functions: "never",
      },
    ],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always",
      },
    ],
    "no-var": "error",
    "arrow-parens": ["error", "always"],
    "no-console": "warn",
  },
};
