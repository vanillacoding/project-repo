module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    mocha: true,
  },
  extends: ["airbnb-base", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "consistent-return": "off",
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-unused-vars": "off",
  },
};
