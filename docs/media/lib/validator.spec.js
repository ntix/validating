import { validate } from "./validator";
import { StandardErrors, normalize } from "./validation";
import { isNumber, isString } from "./predicates";
describe("validator", () => {
    it("null not null", async () => {
        const result = validate.not.null(null);
        expect(result).toEqual({ notNull: true });
    });
    it("value not null", async () => {
        const result = validate.not.null(1);
        expect(result).toEqual(StandardErrors.EMPTY);
    });
    it("value is null", async () => {
        const result = validate.null(1);
        expect(result).toEqual({ null: true });
    });
    it("value min/max length passes when null", async () => {
        const result = Object.assign(Object.assign({}, validate.minLength(null, 1)), validate.maxLength(null, 1));
        expect(result).toEqual({});
    });
    it("value includes A", async () => {
        const result = validate.includes("ABC", "A");
        expect(result).toEqual(StandardErrors.EMPTY);
    });
    it("value does not include A", async () => {
        const result = validate.not.includes("ABC", "A");
        expect(result).toEqual({ notIncludes: "A" });
    });
    const re = /^.+?@.+?\.com$/;
    const reDescription = "comEmail";
    [
        ["a@example.com", {}],
        ["a@example.co.uk", { matches: reDescription }]
    ].forEach(([value, expected]) => {
        it(`${value} matches regex`, async () => {
            const result = validate.matches(value, re, reDescription);
            expect(result).toEqual(expected);
        });
    });
    [
        [null, { notNull: true }],
        [1, { notEqual: 1 }],
        [-1, { min: 0 }],
        [3, { max: 2 }],
        ["string", { notString: true }],
        [{}, { number: true }],
        [1.5, { notDecimal: true }],
        [2.5, { max: 2, notDecimal: true }],
        [2, StandardErrors.EMPTY]
    ].forEach(([value, expected]) => {
        it(`testValidator with ${value}`, () => {
            const result = testNumberValidator(value);
            expect(result).toEqual(expected);
        });
    });
    [
        [null, { notNull: true }],
        [
            { userName: "bob" },
            { userName: { minLength: 6 }, password: { notNull: true } }
        ],
        [
            {
                userName: "robert",
                password: "password",
                passwordConfirm: "password"
            },
            { password: { matches: "complexity" } }
        ],
        [
            {
                userName: "robert",
                password: "passw0rd",
                passwordConfirm: "not-password"
            },
            { passwordConfirm: { equal: "passw0rd" } }
        ],
        [
            {
                userName: "robert",
                password: "passw0rd",
                passwordConfirm: "passw0rd"
            },
            StandardErrors.EMPTY
        ]
    ].forEach(([value, expected]) => {
        it(`validateUserRegistration with ${JSON.stringify(value, undefined, 2)}`, () => {
            const result = normalize(validateUserRegistration(value));
            expect(result).toEqual(expected);
        });
    });
});
function testNumberValidator(value) {
    if (value == null)
        return StandardErrors.not.null;
    if (isString(value))
        return StandardErrors.not.string;
    if (!isNumber(value))
        return StandardErrors.number;
    return Object.assign(Object.assign(Object.assign(Object.assign({}, validate.not.equal(value, 1)), validate.min(value, 0)), validate.max(value, 2)), validate.not.rule(notDecimalRule(value)));
}
function notDecimalRule(value) {
    return {
        result: !Number.isInteger(value),
        errorKey: "decimal"
    };
}
function validateUserRegistration(value) {
    if (value == null)
        return StandardErrors.not.null;
    return {
        userName: validateUserName(value.userName),
        password: validatePassword(value.password),
        passwordConfirm: validate.equal(value.passwordConfirm, value.password)
    };
}
function validateUserName(value) {
    if (value == null)
        return StandardErrors.not.null;
    return Object.assign(Object.assign({}, validate.minLength(value, 6)), validate.maxLength(value, 12));
}
function validatePassword(value) {
    if (value == null)
        return StandardErrors.not.null;
    return Object.assign(Object.assign(Object.assign({}, validate.minLength(value, 6)), validate.maxLength(value, 30)), validate.matches(value, /\d/, "complexity"));
}
//# sourceMappingURL=validator.spec.js.map