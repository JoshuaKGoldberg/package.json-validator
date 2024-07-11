import eslint from "@eslint/js";
import n from "eslint-plugin-n";

export default [
	eslint.configs.recommended,
	{
		languageOptions: {
			sourceType: "commonjs",
		},
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
		files: ["**/*.md/*.ts"],
		rules: {
			"n/no-missing-import": [
				"error",
				{ allowModules: ["package-json-validator"] },
			],
		},
	},
];
