module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    semi: "warn",
    "no-unused-vars": "warn",
    "react/prop-types": "off",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: "true",
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
