module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['react-app'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    quotes: ['error', 'single'],
    'eol-last': ['error', 'always'],
    'react-hooks/exhaustive-deps': 'off'
  },
};
