var PJV = window.PJV;

function getPackageJson(extra) {
    var out = {
        "name": "test-package",
        "version": "0.5.0"
    };
    if (extra) {
        for (var name in extra) {
            out[name] = extra[name];
        }
    }
    return out;
}
var npmWarningFields = {
    author: "Nick Sullivan <nick@sullivanflock.com>",
    description : "This is my description",
    keywords : ["keyword1", "keyword2", "keyword3"],
    bugs : "http://example.com/bugs",
    repository : { "type": "git", "url": "git@github.com:gorillamania/package.json-validator.git"},
    licenses : [{ "type": "MIT", "url": "http://example.com/license"}],
    contributors: ["Nick Sullivan <nick@sullivanflock.com>"]
};


QUnit.module("Basic");

QUnit.test("Input types", function() {
    QUnit.ok(PJV.validate("string").critical, "string");
    QUnit.ok(PJV.validate("{").critical, "malformed object");
    QUnit.ok(PJV.validate("[]").critical, "array");
    QUnit.ok(PJV.validate('"malformed"').critical, "quoted string");
    QUnit.ok(PJV.validate("42").critical, "number");
    QUnit.ok(PJV.validate("null").critical, "null");
    QUnit.ok(PJV.validate("true").critical, "true");
    QUnit.ok(PJV.validate("false").critical, "false");
    QUnit.ok(PJV.validate({}).critical, "literal object");
});

QUnit.module("NPM");

QUnit.test("Field formats", function() {
    QUnit.ok(PJV.packageFormat.test("a"), "one alphanumeric character");
    QUnit.ok(PJV.packageFormat.test("abcABC123._-"), "url safe characters");
    QUnit.equal(PJV.packageFormat.test(".abc123"), false, "starts with dot");
    QUnit.equal(PJV.packageFormat.test("_abc123"), false, "starts with underscore");
    QUnit.equal(PJV.validatePeople("people", "Barney Rubble").length, 0, "author string: name");
    QUnit.equal(PJV.validatePeople("people", "Barney Rubble <b@rubble.com> (http://barneyrubble.tumblr.com/)").length, 0, "author string: name, email, url");
    QUnit.equal(PJV.validatePeople("people", "<b@rubble.com> (http://barneyrubble.tumblr.com/)").length > 0, 1, "author string: name required");
    QUnit.equal(PJV.validate(JSON.stringify(getPackageJson({bin: "./path/to/program"})), "npm").valid, true, "bin: can be string");
    QUnit.equal(PJV.validate(JSON.stringify(getPackageJson({bin: {"my-project": "./path/to/program"}})), "npm").valid, true, "bin: can be object");
    QUnit.equal(PJV.validate(JSON.stringify(getPackageJson({bin: ["./path/to/program"]})), "npm").valid, false, "bin: can't be an array");
});

QUnit.test("Dependencies Ranges", function() {
    var json = getPackageJson({
        dependencies: {
            star: '*',
            empty: '',
            url: 'https://github.com/gorillamania/package.json-validator',
            'caret-first': '^1.0.0',
            'tilde-first': '~1.2',
            'x-version': '1.2.x',
            'tilde-top': '~1',
            'caret-top': '^1'
        },
        devDependencies: {
            'range': '1.2.3 - 2.3.4',
            'lteq': '<=1.2.3',
            'gteq': '>=1.2.3',
            'verion-build': '1.2.3+build2012',
            'lt': '<1.2.3',
            'gt': '>1.2.3'
        }
    });
    var result = PJV.validate(JSON.stringify(json), "npm", {warnings: false, recommendations: false});
    QUnit.equal(result.valid, true, JSON.stringify(result));
    QUnit.equal(result.critical, undefined, JSON.stringify(result));
});


QUnit.test("Required fields", function() {
    var json = getPackageJson();
    var result = PJV.validate(JSON.stringify(json), "npm", {warnings: false, recommendations: false});
    QUnit.equal(result.valid, true, JSON.stringify(result));
    QUnit.equal(result.critical, undefined, JSON.stringify(result));

    ["name", "version"].forEach(function(field) {
        json = getPackageJson();
        delete json[field];
        result = PJV.validate(JSON.stringify(json), "npm", {warnings: false, recommendations: false});
        QUnit.equal(result.valid, false, JSON.stringify(result));
        QUnit.equal(result.warnings, undefined, JSON.stringify(result));
    });
});


QUnit.test("Warning fields", function() {
    var json = getPackageJson(npmWarningFields);
    var result = PJV.validate(JSON.stringify(json), "npm", {warnings: true, recommendations: false});
    QUnit.equal(result.valid, true, JSON.stringify(result));
    QUnit.equal(result.critical, undefined, JSON.stringify(result));

    for (var field in npmWarningFields) {
        json = getPackageJson(npmWarningFields);
        delete json[field];
        result = PJV.validate(JSON.stringify(json), "npm", {warnings: true, recommendations: false});
        QUnit.equal(result.valid, true, JSON.stringify(result));
        QUnit.equal(result.warnings && result.warnings.length, 1, JSON.stringify(result));
    }
});


QUnit.test("Recommended fields", function() {
    var recommendedFields = {
        homepage : "http://example.com",
        engines : { "node" : ">=0.10.3 <0.12" },
        dependencies : { "package-json-validator" : "*" }
    };
    var json = getPackageJson(recommendedFields);
    var result = PJV.validate(JSON.stringify(json), "npm", {warnings: false, recommendations: true});
    QUnit.equal(result.valid, true, JSON.stringify(result));
    QUnit.equal(result.critical, undefined, JSON.stringify(result));

    for (var field in recommendedFields) {
        json = getPackageJson(recommendedFields);
        delete json[field];
        result = PJV.validate(JSON.stringify(json), "npm", {warnings: false, recommendations: true});
        QUnit.equal(result.valid, true, JSON.stringify(result));
        QUnit.equal(result.recommendations && result.recommendations.length, 1, JSON.stringify(result));
    }
});

QUnit.test("Licenses", function() {
    // https://npmjs.org/doc/json.html#license

    // licenses as an array
    var json = getPackageJson(npmWarningFields);
    var result = PJV.validate(JSON.stringify(json), "npm", {warnings: true, recommendations: false});
    QUnit.equal(result.valid, true, JSON.stringify(result));
    QUnit.equal(result.critical, undefined, JSON.stringify(result));
    QUnit.equal(result.warnings, undefined, JSON.stringify(result));

    // licenses as a single type
    json = getPackageJson(npmWarningFields);
    delete json.licenses;
    json.license = "MIT";
    result = PJV.validate(JSON.stringify(json), "npm", {warnings: true, recommendations: false});
    QUnit.equal(result.valid, true, JSON.stringify(result));
    QUnit.equal(result.critical, undefined, JSON.stringify(result));
    QUnit.equal(result.warnings, undefined, JSON.stringify(result));

    // neither
    json = getPackageJson(npmWarningFields);
    delete json.licenses;
    result = PJV.validate(JSON.stringify(json), "npm", {warnings: true, recommendations: false});
    QUnit.equal(result.valid, true, JSON.stringify(result));
    QUnit.equal(result.critical, undefined, JSON.stringify(result));
    QUnit.equal(result.warnings && result.warnings.length, 1, JSON.stringify(result));
});
