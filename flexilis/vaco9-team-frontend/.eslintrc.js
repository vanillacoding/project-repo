module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'indent': ['error', 2],
    'comma-dangle': ['error', {
      'arrays': 'never',
      'objects': 'only-multiline',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never',
    }],
    'no-trailing-spaces': ['error', { 'skipBlankLines': false }],
  },
};
