<h1 align="center">package.json validator</h1>

<p align="center">Tools to validate <code>package.json</code> files.</p>

<p align="center">
	<a href="https://github.com/JoshuaKGoldberg/package.json-validator/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://github.com/JoshuaKGoldberg/package.json-validator/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/package.json-validator"><img alt="📦 npm version" src="https://img.shields.io/npm/v/package-json-validator?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
</p>

## Supported Specifications

Of course, there are multiple ones to follow, which makes it trickier.

- [NPM](https://docs.npmjs.com/cli/configuring-npm/package-json)
- [CommonJS Packages 1.0](http://wiki.commonjs.org/wiki/Packages/1.0)
- [CommonJS Packages 1.1](http://wiki.commonjs.org/wiki/Packages/1.1)

## Usages

### Command line

```shell
npm install package-json-validator -g
```

See `pjv --help` for usage:

```plaintext
Options:
  --filename, -f         package.json file to validate                      [default: "package.json"]
  --spec, -s             which spec to use - npm|commonjs_1.0|commonjs_1.1  [default: "npm"]
  --warnings, -w         display warnings                                   [default: false]
  --recommendations, -r  display recommendations                            [default: false]
  --quiet, -q            less output                                        [default: false]
  --help, -h, -?         this help message                                  [default: false]
```

### Node.js

```shell
npm install package-json-validator`
```

```js
import { PJV } from "package-json-validator";

PJV.validate(/* ... */);
```

## API

```js
PJV.validate(packageData[([, spec], options)]);
```

`spec` is either `npm`, `commonjs_1.0`, or `commonjs_1.1`

`options` is an object with the following available:

```js
{
    warnings: true, // show warnings
    recommendations: true // show recommendations
}
```

Example:

```js
const { PJV } = require("package-json-validator");

PJV.validate(data, spec, options);
```

Example1:

```js
const { PJV } = require("package-json-validator");

const text = JSON.stringify({
	name: "packageJsonValidator",
	version: "0.1.0",
	private: true,
	dependencies: {
		"date-fns": "^2.29.3",
		install: "^0.13.0",
		react: "^18.2.0",
		"react-chartjs-2": "^5.0.1",
		"react-dom": "^18.2.0",
		"react-material-ui-carousel": "^3.4.2",
		"react-multi-carousel": "^2.8.2",
		"react-redux": "^8.0.5",
		"react-router-dom": "^6.4.3",
		"react-scripts": "5.0.1",
		redux: "^4.2.0",
		"styled-components": "^5.3.6",
		"web-vitals": "^2.1.4",
	},
	scripts: {
		start: "react-scripts start",
	},
	eslintConfig: {
		extends: ["react-app", "react-app/jest"],
	},
	browserslist: {
		production: [">0.2%", "not dead", "not op_mini all"],
		development: [
			"last 1 chrome version",
			"last 1 firefox version",
			"last 1 safari version",
		],
	},
});

const data = PJV.validate(text);
```

Output for above example:

```js
console.log(data);
// {
//  valid: true,
//   warnings: [
//    'Missing recommended field: description',
//    'Missing recommended field: keywords',
//    'Missing recommended field: bugs',
//    'Missing recommended field: licenses',
//    'Missing recommended field: author',
//    'Missing recommended field: contributors',
//    'Missing recommended field: repository'
//  ],
//  recommendations: [
//    'Missing optional field: homepage',
//    'Missing optional field: engines'
//  ]
}
```

## Appreciation

Many thanks to [@TechNickAI](https://github.com/TechNickAI) for creating the initial version and core infrastructure of this package! 💖
