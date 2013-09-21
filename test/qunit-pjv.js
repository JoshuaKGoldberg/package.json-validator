var PJV = window.PJV;

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
    QUnit.ok(PJV.validate("{}").valid, "literal object");
});

QUnit.test("Basic", function() {

});
