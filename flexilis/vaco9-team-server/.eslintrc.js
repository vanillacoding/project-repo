module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12,
  },
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
    'no-trailing-spaces': ['error', { 'skipBlankLines': false, }],
  },
};
