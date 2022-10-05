module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  plugins: ["prettier"],
  ignorePatterns: ["node_modules/"],
  rules: {
    indent: ["warn", 2],
    quotes: ["warn", "double"],
    semi: ["warn", "always"],
    curly: ["warn", "all"],
    "no-var": "error",
    "eol-last": ["warn", "always"],
    "arrow-parens": ["warn", "always"],
    "func-style": ["warn", "declaration"],
    "comma-dangle": ["warn", "always-multiline"],
    "prettier/prettier": ["warn", { printWidth: 100 }],
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
