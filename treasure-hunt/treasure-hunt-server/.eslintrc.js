module.exports = {
  "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "mocha": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018
  },
  "rules": {
    "indent": [
      "error",
      2, { "SwitchCase": 1 }
    ],
    "semi": [
      "error"
    ],
    "quotes": [
      "error", 
      "single"
    ],
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "key-spacing": [
      "error",
      {
        "beforeColon": false,
        "afterColon": true,
        "mode": "strict",
      }
    ],
    "comma-spacing": [
      "error",
      {
        "before": false,
        "after": true
      }
    ],
    "no-unused-vars": 1,
    "no-use-before-define": [
      "error", 
      {
        "functions": false
      }
    ],
    "no-trailing-spaces": [
      "error",
      {
        "skipBlankLines": true,
        "ignoreComments": true
      }
    ],
    "space-before-function-paren":[
      "error", "never"
    ],
  }
};
