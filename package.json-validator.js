/* Parse the incoming string as JSON, validate it against the spec for package.json
 * See README for more details
 */
var PJV = {};

PJV.getSpecMap = function(specName) {

    if (specName == "npm") {
        // https://github.com/isaacs/npm/blob/c1f44603019651b99f7bfd129fa89e2c09e8f369/doc/cli/json.md
        return {
            "name":         {"type": "string", required: true, format: /^[a-z0-9][a-z0-9\.\-_]+$/},
            "version":      {"type": "string", required: true, format: /^[0-9]+\.[0-9]+\.[0-9+a-zA-Z\.]$/},
            "description":  {"type": "string", recommended: true},
            "keywords":     {"type": "array", recommended: true},
            "homepage":     {"type": "string", recommended: true, format: /^http:\/\/[a-z.\-0-9]+/},
            "bugs":         {"type": "string", recommended: true}, // XXX bugs can be a string or an object
            "author":       {"type": "object", required: true},
            "maintainers":  {"type": "object", recommended: true},
            "contributors": {"type": "object"},
            "files":        {"type": "array"},
            "main":         {"type": "array"},
            "bin":          {"type": "object"},
            "man":          {"type": "object"},
            "directories":  {"type": "object"},
            "repository":   {"type": "object"},
            "scripts":      {"type": "object"},
            "config":       {"type": "object"},
            "dependencies": {"type": "object"},
            "devDependencies": {"type": "object"},
            "bundledDependencies": {"type": "object"},
            "optionalDependencies": {"type": "object"},
            "engines":      {"type": "object"},
            "engineStrict": {"type": "boolean"},
            "os":           {"type": "array"},
            "cpu":          {"type": "array"},
            "preferGlobal": {"type": "boolean"},
            "private":      {"type": "boolean"},
            "publishConfig":{"type": "object"}
        };

    } else if (specName == "commonjs_1.0") {
        // http://wiki.commonjs.org/wiki/Packages/1.0
        return {
            "name":         {"type": "string", required: true, format: /^[a-z0-9\.\-_]+$/},
            "description":  {"type": "string", required: true},
            "version":      {"type": "string", required: true, format: /^[0-9]+\.[0-9]+\.[0-9+a-zA-Z\.]$/},
            "keywords":     {"type": "array", required: true},
            "maintainers":  {"type": "array", required: true},
            "contributors": {"type": "array", required: true},
            "bugs":         {"type": "string", required: true}, // XXX bugs can be a string or an object
            "licenses":     {"type": "array", required: true},
            "repositories": {"type": "object", required: true},
            "dependencies": {"type": "object", required: true},

            "homepage":     {"type": "string", recommended: true, format: /^http:\/\/[a-z.\-0-9]+/},
            "os":           {"type": "array"},
            "cpu":          {"type": "array"},
            "engine":       {"type": "array"},
            "builtin":      {"type": "boolean"},
            "directories":  {"type": "object"},
            "implements":   {"type": "array"},
            "scripts":      {"type": "object"},
            "checksums":    {"type": "object"}
        };

    } else if (specName == "commonjs_1.1") {
        // http://wiki.commonjs.org/wiki/Packages/1.1
        return {
            "name":         {"type": "string", required: true, format: /^[a-z0-9\.\-_]+$/},
            "version":      {"type": "string", required: true, format: /^[0-9]+\.[0-9]+\.[0-9+a-zA-Z\.]$/},
            "main":         {"type": "array", required: true},
            "directories":  {"type": "object", required: true},

            "maintainers":  {"type": "array", recommended: true},
            "description":  {"type": "string", recommended: true},
            "licenses":     {"type": "array", recommended: true},
            "bugs":         {"type": "string", recommended: true},
            "keywords":     {"type": "array"},
            "repositories": {"type": "array"},
            "contributors": {"type": "array"},
            "dependencies": {"type": "object"},
            "homepage":     {"type": "string", recommended: true, format: /^http:\/\/[a-z.\-0-9]+/},
            "os":           {"type": "array"},
            "cpu":          {"type": "array"},
            "engine":       {"type": "array"},
            "builtin":      {"type": "boolean"},
            "implements":   {"type": "array"},
            "scripts":      {"type": "object"},
            "overlay":      {"type": "object"},
            "checksums":    {"type": "object"}
        };

    } else {
        // Unrecognized spec
        return false;
    }

};

PJV.validatePackage = function(data, specName, options) {
    var parsed;
    var out = {"valid": false};
    if (!data) {
        out.critical = {"Empty JSON": "No data to parse"};
        return out;
    }
    try {
        parsed = JSON.parse(data);
    } catch (e) {
        out.critical = {"Invalid JSON": e.toString()};
        return out;
    }

    if (typeof parsed != "object") {
        out.critical = {"JSON is not an object": typeof parsed};
        return out;
    }

    var map = PJV.getSpecMap(specName);
    if (specName === false) {
        out.critical = {"Invalid specification": specName};
        return out;
    }
    var errors = [],
        warnings = [],
        recommendations = [];

     for (var name in map) {
        var field = map[name];

        if (typeof parsed[name] == "undefined") {
            if (field.required) {
                errors.push("Missing required field: " + name);
            } else if (field.recommended) {
                warnings.push("Missing recommended field: " + name);
            } else {
                recommendations.push("Missing optional field: " + name);
            }
            continue;
        }

        // Type checking
        if ((field.type == "array" && !parsed[name] instanceof Array)
                || (field.type !="array" && typeof parsed[name] != field.type) ) {
            errors.push("Type for field " + name + ", was expected to be " + field.type + ", not " + typeof parsed[name]);
            continue;
        }

        // Regexp format check
        if (field.format && !field.format.test(parsed[name])) {
            errors.push("Value for field " + name + ", " + parsed[name] + " does not match format: " + field.format.toString());
        }
    }

    out.valid = errors.length > 0 ? false : true;
    if (errors.length > 0) {
        out.errors = errors;
    }
    if (options.warnings !== false && warnings.length > 0 ) {
        out.warnings = warnings;
    }
    if (options.recommendations !== false && recommendations.length > 0 ) {
        out.recommendations = recommendations;
    }

    return out;
};
