module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true,
    "jest": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "detox",
    "enzyme"
  ],
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "enzyme/no-shallow": 2,
    "no-unused-vars": 1,
    "no-console": 1,
    "no-empty": 1,
    "no-irregular-whitespace": 1
  }
};
