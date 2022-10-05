module.exports = {
  plugins: ["prettier"],
  env: {
    browser: true,
    es2021: true,
    node: true,
    webextensions: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    semi: ["error", "always"],
    "no-trailing-spaces": 0,
    "keyword-spacing": 0,
    "no-unused-vars": 1,
    "no-multiple-empty-lines": 0,
    "space-before-function-paren": 0,
    "eol-last": 0,
  },
};
