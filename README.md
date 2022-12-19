# About

`package.json` files are required for node.js/npm projects. Beyond just valid json, there are required fields to follow the specifications.  This tool verifies the package.json against the specification of your choice, letting you know if you have a valid file. The validation reports required fields that you MUST have, warns for fields that you SHOULD have, and recommends optional fields that you COULD have.

![Circle CI Build Status](https://circleci.com/gh/gorillamania/package.json-validator.png?circle-token=9aadc02abff3bc88226345667198776987f04052)

## Supported Specifications
Of course, there are multiple ones to follow, which makes it trickier.

* [NPM](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)
* [CommonJS Packages 1.0](http://wiki.commonjs.org/wiki/Packages/1.0)
* [CommonJS Packages 1.1](http://wiki.commonjs.org/wiki/Packages/1.1)


## Usages


### Command line
`npm install package-json-validator -g`

See `pjv --help` for usage:

```
Options:
  --filename, -f         package.json file to validate                      [default: "package.json"]
  --spec, -s             which spec to use - npm|commonjs_1.0|commonjs_1.1  [default: "npm"]
  --warnings, -w         display warnings                                   [default: false]
  --recommendations, -r  display recommendations                            [default: false]
  --quiet, -q            less output                                        [default: false]
  --help, -h, -?         this help message                                  [default: false]
```

### As a node library
`npm install package-json-validator`

### Via Grunt
Have your package validate via a Grunt plugin - see [grunt-nice-package](https://npmjs.org/package/grunt-nice-package)

### Via Gulp
Have your package validate via a [gulp](http://gulpjs.com/) plugin - see [gulp-nice-package](https://github.com/chmontgomery/gulp-nice-package)

## API

```js
PJV.validate(packageData[[, spec], options])
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
var PJV=require('package-json-validator').PJV;
PJV.validate(data, spec, options)
```

Example1:
```js
 var PJV=require('package-json-validator').PJV;
 let text=JSON.stringify({
      "name": "packageJsonValidator",
      "version": "0.1.0",
      "private": true,
      "dependencies": {
        "date-fns": "^2.29.3",
        "install": "^0.13.0",
        "react": "^18.2.0",
        "react-chartjs-2": "^5.0.1",
        "react-dom": "^18.2.0",
        "react-material-ui-carousel": "^3.4.2",
        "react-multi-carousel": "^2.8.2",
        "react-redux": "^8.0.5",
        "react-router-dom": "^6.4.3",
        "react-scripts": "5.0.1",
        "redux": "^4.2.0",
        "styled-components": "^5.3.6",
        "web-vitals": "^2.1.4"
      },
      "scripts": {
        "start": "react-scripts start"
      },
      "eslintConfig": {
        "extends": [
          "react-app",
          "react-app/jest"
        ]
      },
      "browserslist": {
        "production": [
          ">0.2%",
          "not dead",
          "not op_mini all"
        ],
        "development": [
          "last 1 chrome version",
          "last 1 firefox version",
          "last 1 safari version"
        ]
      }
    })
    const data=PJV.validate(text)
```
Output for above example
```js
console.log(data)
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
 
## Issues/Requests
Please check out [the existing issues](https://github.com/gorillamania/package.json-validator/issues), 
and if you don't see that your problem is already being worked on, 
please [file an issue](https://github.com/gorillamania/package.json-validator/issues/new).

### Fork and Pull request
Since you are probably a developer, you can probably just make the change yourself and submit a 
[pull request](https://help.github.com/articles/using-pull-requests)

## License
See [LICENSE](https://github.com/gorillamania/package.json-validator/blob/master/LICENSE)
