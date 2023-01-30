module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["google", "plugin:prettier/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    createDefaultProgram: true,
  },
  plugins: ["prettier"],
  rules: { "new-cap": "off" },
  ignorePatterns: ["!.eslintrc.js", "!.prettierrc.json"],
};
