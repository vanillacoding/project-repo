module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'jest': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'semi': [
      'warn',
      'always',
    ],
    'quotes': [
      'warn',
      'single',
    ],
    'eol-last': [
      'warn',
      'always',
    ],
    'no-unused-vars': [
      'warn',
      {
        'args': 'none',
      },
    ],
    'arrow-parens': [
      'warn',
      'always',
    ],
    'func-style': [
      'warn',
      'expression',
    ],
    'no-unsafe-finally': 'off',
    'react/prop-types': 'off',
  },
};
