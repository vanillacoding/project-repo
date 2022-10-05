module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'node': true
  },
  'parserOptions': {
    'ecmaVersion': 12
  },
  'rules': {
    'semi': [
      'error',
      'always',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'eol-last': [
      'error',
      'always',
    ],
    'no-unused-vars': [
      'error',
      {
        'args': 'none',
      },
    ],
    'arrow-parens': [
      'error',
      'always',
    ],
    'func-style': [
      'error',
      'expression',
    ],
    'no-unsafe-finally': 'off',
  },
};
