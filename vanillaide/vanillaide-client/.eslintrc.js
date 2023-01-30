module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "google",
    "universe/native",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    createDefaultProgram: true,
  },
  plugins: ["react", "prettier"],
  rules: {
    "spaced-comment": "off",
    "require-jsdoc": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/ignore": ["react-native"],
  },
  ignorePatterns: ["!.eslintrc.js", "!.prettierrc.json"],
};
