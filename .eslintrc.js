// @ts-check
/* eslint-env node */

"use strict";

/**
 * An object with ESLint options.
 * @type {import('eslint').Linter.Config}
 */
const options = {
	root: true,
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020
	},
	plugins: ["@typescript-eslint"],
	extends: [
		"eslint:recommended",
		"prettier",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended"
	]
};

module.exports = options;
