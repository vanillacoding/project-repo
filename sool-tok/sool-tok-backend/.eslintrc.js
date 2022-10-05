module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 12,
  },
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
