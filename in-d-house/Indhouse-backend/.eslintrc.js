module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true,
  },
  "extends": ["eslint:recommended", "airbnb-base"],
  "parserOptions": {
    "ecmaVersion": 12,
  },
  "rules": {
    "eqeqeq": ["error", "always"],
    "quotes": ["warn", "double", { "allowTemplateLiterals": true }],
    "quote-props": ["error", "consistent"],
    "no-unused-vars": ["off"],
    "no-console": ["off"],
    "no-underscore-dangle": ["off"],
    "no-param-reassign": ["off"],
    "newline-per-chained-call": ["off"],
    "consistent-return": ["off"],
    "arrow-parens": ["warn", "as-needed"],
    "camelcase": ["off"],
  },
};
