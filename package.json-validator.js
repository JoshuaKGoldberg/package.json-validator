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
        name: {"type": "string", required: true},
        version: {"type": "string", required: true}
    };

    for (var field in map) {
        if (map[field].required && !parsed[field]) {
            out.errors.push("Missing required field: '" + field + "'");
        }
    }

    if (! out.errors.length && !out.warnings.length) {
        return {valid: true};
    } else {
        return out;
    }

}
