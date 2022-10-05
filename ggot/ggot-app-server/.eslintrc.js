module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 12
    },
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
        'no-unused-vars': 'off'
    }
};
