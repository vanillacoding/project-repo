module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['eslint:recommended', 'airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }]
  }
};
