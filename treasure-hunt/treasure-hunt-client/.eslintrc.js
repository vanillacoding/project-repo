module.exports = {
    "env": {
			"browser": true,
			"es6": true,
			"jest": true,
    },
    "extends": [
			"eslint:recommended",
			"plugin:react/recommended",
    ],
    "globals": {
			"Atomics": "readonly",
      "SharedArrayBuffer": "readonly",
    },
    "parserOptions": {
			"ecmaFeatures": {
				"jsx": true
			},
			"ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
			"react"
		],
    "rules": {
			"indent": [
				"error",
				2,
				{
					"SwitchCase": 1,
					"MemberExpression": 1
				}
			],
			"semi": [
				"error"
			],
			"quotes": [
				"error", 
				"single"
			],
			"object-curly-spacing": [
				"error",
				"always"
			],
			"key-spacing": [
				"error",
				{
					"beforeColon": false,
					"afterColon": true,
					"mode": "strict",
				}
			],
			"comma-spacing": [
				"error",
				{
					"before": false,
					"after": true
				}
			],
			"no-unused-vars": 1,
			"no-use-before-define": [
				"error", 
				{
					"functions": false
				}
			],
			"no-trailing-spaces": [
				"error",
				{
					"skipBlankLines": true,
					"ignoreComments": true
				}
      ],
      "react/prop-types": [
        "error",
        {
          "ignore": ["navigation", "route"]
        }
      ],
      "space-before-function-paren":[
        "error", "never"
			],
			"no-use-before-define": [
				"error",
				{
					"functions": true,
					"classes": true,
					"variables": false
				}
			],
			"react/display-name": "off",
			"no-case-declarations": "off",
    }
};
