module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  ignorePatterns: ["node_modules/"],
  extends: [
    "plugin:react/recommended",
    "airbnb",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
  ],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    indent: ["error", 2, { SwitchCase: 1, MemberExpression: 1 }],

    "arrow-body-style": "off",
    "consistent-return": "off",
    "no-plusplus": "off",
    "no-await-in-loop": "off",
    "import/export": 0,
    "import/no-unresolved": "off",
    "no-unused-vars": ["warn", { argsIgnorePattern: "err|req|res|next" }],
    "no-underscore-dangle": "off",
    "no-multi-assign": "off",
    "no-shadow": "off",
    "react/destructuring-assignment": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": ["warn", { extensions: [".js", ".jsx"] }],
    "react/jsx-uses-react": "off",
    "react/jsx-props-no-spreading": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "no-param-reassign": ["error", { props: false }],
    "react/jsx-one-expression-per-line": "off",
  },
};
