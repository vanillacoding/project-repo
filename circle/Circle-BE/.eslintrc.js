module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb", "airbnb/hooks"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-unused-vars": [
      "error",
      { vars: "all", args: "none", ignoreRestSiblings: false },
    ],
    "max-len": [
      "error",
      {
        code: 80,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    "import/no-unresolved": [
      "error",
      {
        ignore: ["^firebase-admin/.+"],
      },
    ],
  },
};
