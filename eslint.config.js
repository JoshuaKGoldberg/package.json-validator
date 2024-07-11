const eslint = require("@eslint/js");
const n = require("eslint-plugin-n");

module.exports = [
	eslint.configs.recommended,
	{
		linterOptions: {
			reportUnusedDisableDirectives: "error",
		},
		rules: {
			"no-undef": "off",
			"no-useless-escape": "off",
		},
	},
	n.configs["flat/recommended"],
	{
		files: ["*.jsonc"],
		rules: {
			"jsonc/comma-dangle": "off",
			"jsonc/no-comments": "off",
			"jsonc/sort-keys": "error",
		},
	},
	{
		files: ["*.mjs"],
		languageOptions: {
			sourceType: "module",
		},
	},
	{
		files: ["**/*.md/*.ts"],
		rules: {
			"n/no-missing-import": [
				"error",
				{ allowModules: ["package-json-validator"] },
			],
		},
	},
];
