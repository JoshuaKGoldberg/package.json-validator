var PJV = window.PJV;

function getPackageJson(extra) {
    var out = {
        "name": "test-package",
        "version": "0.5.0",
        "author": "Nick Sullivan <nick@sullivanflock.com>"
    };
    if (extra) {
        for (var name in extra) {
            out[name] = extra[name];
        }
    }
    return out;
}

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

QUnit.test("NPM required fields", function() {
    var json = getPackageJson();
    var result = PJV.validate(JSON.stringify(json), "npm", {warnings: false, recommendations: false});
    QUnit.equal(result.valid, true, JSON.stringify(result));
    QUnit.equal(result.critical, undefined, JSON.stringify(result));

    ["name", "author", "version"].forEach(function(field) {
        json = getPackageJson();
        delete json[field];
        result = PJV.validate(JSON.stringify(json), "npm", {warnings: false, recommendations: false});
        QUnit.equal(result.valid, false, JSON.stringify(result));
        QUnit.equal(result.warnings, undefined, JSON.stringify(result));
    });
});

QUnit.test("NPM warning fields", function() {
    var warningFields = {
        description : "This is my description",
        keywords : ["keyword1", "keyword2", "keyword3"],
        homepage : "http://example.com",
        bugs : "http://example.com/bugs",
        repository : { "type": "git", "url": "git@github.com:gorillamania/package.json-validator.git"},
        licenses : [{ "type": "MIT", "url": "http://example.com/license"}]
    };
    var json = getPackageJson(warningFields);
    var result = PJV.validate(JSON.stringify(json), "npm", {warnings: true, recommendations: false});
    QUnit.equal(result.valid, true, JSON.stringify(result));
    QUnit.equal(result.critical, undefined, JSON.stringify(result));

    for (var field in warningFields) {
        json = getPackageJson(warningFields);
        delete json[field];
        result = PJV.validate(JSON.stringify(json), "npm", {warnings: true, recommendations: false});
        QUnit.equal(result.valid, true, JSON.stringify(result));
        QUnit.equal(result.warnings && result.warnings.length, 1, JSON.stringify(result));
    }
});
