module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
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
            'error',
            'always',
        ],
        'eol-last': [
            'error',
            'always'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'no-useless-escape': 'off'
    }
};
