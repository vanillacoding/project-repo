module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-bitwise': ['error', { allow: ['~', '|', '>>', '<<', '&'] }],
    'no-param-reassign': [2, { props: false }],
    'react/no-array-index-key': [0],
    'jsx-a11y/anchor-is-valid': 'off',
    'arrow-body-style': 'off',
    'consistent-return': 'off',
    'react/prop-types': 'off',
  },
};
