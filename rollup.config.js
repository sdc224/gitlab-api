// @ts-check

import { terser } from "rollup-plugin-terser";
import typescript2 from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";

import pkg from "./package.json";

const environment = process.env.NODE_ENV;

/**
 * Comment with library information to be appended in the generated bundles.
 */
const banner = `/*!
 * ${pkg.name} v${pkg.version}
 * (c) ${pkg.author.name}. All Rights Reserved
 * Released under the ${pkg.license} License.
 */
`;

/**
 * Creates an output options object for Rollup.js.
 * @param {import('rollup').OutputOptions} options
 * @returns {import('rollup').OutputOptions}
 */
function createOutputOptions(options) {
	return {
		banner,
		name: "@sdc224/gitlab-api",
		exports: "named",
		sourcemap: environment !== "production",
		...options
	};
}

/**
 * @type {import('rollup').RollupOptions}
 */
const options = {
	input: "./src/index.ts",
	output: [
		createOutputOptions({
			file: "./dist/index.js",
			format: "commonjs"
		}),
		createOutputOptions({
			file: "./dist/index.cjs",
			format: "commonjs"
		}),
		createOutputOptions({
			file: "./dist/index.mjs",
			format: "esm"
		}),
		createOutputOptions({
			file: "./dist/index.esm.js",
			format: "esm"
		}),
		createOutputOptions({
			file: "./dist/index.umd.js",
			format: "umd"
		}),
		createOutputOptions({
			file: "./dist/index.umd.min.js",
			format: "umd",
			plugins: [terser()]
		})
	],
	plugins: [
		typescript2({
			clean: true,
			useTsconfigDeclarationDir: true,
			tsconfig: "./tsconfig.bundle.json"
		}),
		copy({
			targets: [
				{
					src: "src/@types",
					dest: "dist/types"
				},
				{
					src: "src/models",
					dest: "dist/types"
				}
			]
		})
	]
};

export default options;
