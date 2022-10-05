module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    indent: ["warn", 2],
    quotes: ["warn", "double"],
    semi: ["warn", "always"],
    curly: ["warn", "all"],
    "react/display-name": "off",
    "no-var": "error",
    "prettier/prettier": ["warn", { printWidth: 100 }],
    "eol-last": ["warn", "always"],
    "arrow-parens": ["warn", "always"],
    "func-style": ["warn", "declaration"],
    "comma-dangle": ["warn", "ignore"],
    "linebreak-style": ["warn", "unix"],
    "no-unused-vars": [
      "warn",
      {
        args: "none",
      },
    ],
    "arrow-spacing": [
      "warn",
      {
        before: true,
        after: true,
      },
    ],
    "prefer-const": [
      "warn",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
  },
};
