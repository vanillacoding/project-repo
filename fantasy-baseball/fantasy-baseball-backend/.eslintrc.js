module.exports = {
  extends: "airbnb-base",
  env: {
    browser: true,
    node: true,
  },
  rules: {
    quotes: ["error", "double"],
    "comma-dangle": [
      "error",
      {
        arrays: "only-multiline",
        objects: "only-multiline",
        functions: "never",
      },
    ],
    "no-underscore-dangle": "off",
    "no-unused-vars": "warn",
    "consistent-return": "off",
  },
  globals: {
    $: false,
  }
};
