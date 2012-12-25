/* Parse the incoming string as JSON, validate it against the spec for package.json
 * See README for more details
 */
function validatePackage(data) {
    var out = {}, parsed;
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

    out.errors = [];
    out.warnings = [];

    // http://wiki.commonjs.org/wiki/Packages/1.1
    var map = {
        "name":     {"type": "string", required: true, format: /^[a-z0-9\.\-_]+$/},
        "version":  {"type": "string", required: true, format: /^[0-9]+\.[0-9]+\.[0-9+a-zA-Z\.]$/}
    };

    for (var name in map) {
        var field = map[name];

        // Required field check
        if (field.required && !parsed[name]) {
            out.errors.push("Missing required field: '" + name + "'");
            continue;
        }

        // Type checking
        if (typeof parsed[name] != field.type ) {
            out.errors.push("Type for field '" + name + "', was expected to be " + field.type + ", not " + typeof parsed[name]);
            continue;
        }

        // Regexp format check
        if (field.format && !field.format.test(parsed[name])) {
            out.errors.push("Value for field '" + name + "', '" + parsed[name] + "' does not match format: " + field.format.toString());
        }
    }

    if (! out.errors.length && !out.warnings.length) {
        return {valid: true};
    } else {
        return out;
    }

}
