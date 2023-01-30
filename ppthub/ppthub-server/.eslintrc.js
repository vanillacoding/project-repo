module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb", "airbnb/hooks", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["prettier"],
  rules: {
    semi: "warn",
    "no-underscore-dangle": "off",
    "no-unused-vars": "warn",
  },
  ignorePatterns: ["!.eslintrc.js", "!.prettierrc.json"],
};
