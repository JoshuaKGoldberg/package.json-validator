# About

`package.json` files are required for node.js/npm projects. Beyond just valid json, there are required fields to follow the specifications.  This tool verifies the package.json against the specification of your choice, letting you know if you have a valid file. The validation reports required fields that you MUST have, warns for fields that you SHOULD have, and recommends optional fields that you COULD have.

![Circle CI Build Status](https://circleci.com/gh/gorillamania/package.json-validator.png?circle-token=9aadc02abff3bc88226345667198776987f04052)

## Supported Specifications
Of course, there are multiple ones to follow, which makes it trickier.

* [NPM](https://npmjs.org/doc/json.html)
* [CommonJS Packages 1.0](http://wiki.commonjs.org/wiki/Packages/1.0)
* [CommonJS Packages 1.1](http://wiki.commonjs.org/wiki/Packages/1.1)


## Usages

### Online
Online copy hosted courtesy of Nick Sullivan at [package-json-validator.com](http://package-json-validator.com/). Want to run your own copy? You are welcome to clone or fork this repo.


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

```
PJV.validate(packageData[[, spec], options])
```

`spec` is either `npm`, `commonjs_1.0`, or `commonjs_1.1`


`options` is an object with the following available:

```
{
    warnings: true, // show warnings
    recommendations: true // show recommendations
}
```

Example:

```
var PJV=require('package-json-validator').PJV;
PJV.validate(data, spec, options)
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
