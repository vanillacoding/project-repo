// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'comma-dangle': ['warn', 'always-multiline'],
    'arrow-parens': ['warn', 'as-needed'],
    'eol-last': ['warn', 'always'],
    'no-unused-vars': ['warn', { args: 'none' }],
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-before-blocks': ['warn', 'always'],
  },
};
