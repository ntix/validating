/** capitalise a string */
function capitalize(value) {
    return !value ? value : value[0].toUpperCase() + value.substr(1);
}

/** Creates a frozen error object
 *
 * @param not         when set will prefix the capitalised error key with 'not'
 * @param errorKey    key value for an error e.g. { someKey: true }
 * @param errorValue  value associated with the key e.g. { key: 'some value' }
 *
 * @returns           a frozen error object
 */
function createError(not, errorKey, errorValue = true) {
    return Object.freeze({
        [not ? `not${capitalize(errorKey)}` : errorKey]: errorValue
    });
}

/** creates all standard errors
 *
 * @param not prefixes all capitalised keys with a 'not' e.g. { notNull: true }
 *
 * @returns standard errors
 */
function createStandardErrors(not = false) {
    return Object.freeze({
        null: createError(not, 'null'),
        number: createError(not, 'number'),
        string: createError(not, 'string'),
        equal: (to) => createError(not, 'equal', to),
        maxLength: (max) => createError(not, 'maxLength', max),
        minLength: (min) => createError(not, 'minLength', min),
        max: (max) => createError(not, 'max', max),
        min: (min) => createError(not, 'min', min),
        includes: (value) => createError(not, 'includes', value),
        matches: (re) => createError(not, 'matches', re)
    });
}

/** StandardErrors available
 *
 * including EMPTY and negated errors
 *
 * negated error keys are prefixed by 'not' e.g. { notNull: true } */
const StandardErrors = Object.freeze(Object.assign(Object.assign({ EMPTY: Object.freeze({}) }, createStandardErrors()), { not: createStandardErrors(true) }));

/** normalize a validation result, by removing empty sub-properties
 *
 * @param errors  any result from a validation function
 *
 * @returns       the result with empty sub-properties removed
 */
function normalize(errors) {
    if (typeof errors !== 'object')
        return errors;
    return Object.keys(errors).reduce((result, key) => {
        const value = normalize(result[key]);
        return value === StandardErrors.EMPTY
            ? result
            : Object.assign(Object.assign({}, result), { [key]: value });
    }, StandardErrors.EMPTY);
}

/** checks value is a date */
function isDate(value) {
    return !isNaN(Date.parse(value));
}

/** deep equality check */
function isEqual(a, b) {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (Array.isArray(a)) {
        return (Array.isArray(b) &&
            a.length === b.length &&
            a.every((v, i) => isEqual(v, b[i])));
    }
    if (typeof a === "object" || typeof b === "object") {
        const av = a.valueOf();
        const bv = b.valueOf();
        if (av !== a || bv !== b)
            return isEqual(av, bv);
        return Object.keys(Object.assign(Object.assign({}, a), b)).every(n => isEqual(a[n], b[n]));
    }
    return false;
}

/** checks value is a string */
function isString(value) {
    return typeof value === "string";
}

/** checks values is a number or a string which can be parsed into a number */
function isNumber(a) {
    if (isString(a))
        a = Number.parseFloat(a);
    return !isNaN(a) && typeof a === "number";
}

class Validator {
    constructor(negate = false) {
        this.negate = negate;
        this.expected = negate ? StandardErrors.not : StandardErrors;
    }
    get not() {
        return new Validator(!this.negate);
    }
    null(a) {
        return this.exec(a == null, this.expected.null);
    }
    number(a) {
        return this.exec(isNumber(a), this.expected.number);
    }
    string(a) {
        return this.exec(isString(a), this.expected.string);
    }
    equal(a, b) {
        return this.exec(isEqual(a, b), this.expected.equal(b));
    }
    maxLength(a, max) {
        return this.exec(a.length <= max, this.expected.maxLength(max));
    }
    minLength(a, min) {
        return this.exec(a.length >= min, this.expected.minLength(min));
    }
    max(a, max) {
        return this.exec(a <= max, this.expected.max(max));
    }
    min(a, min) {
        return this.exec(a >= min, this.expected.min(min));
    }
    includes(a, b) {
        return this.exec(a.includes(b), this.expected.includes(b));
    }
    matches(value, re, description = null) {
        return this.exec(new RegExp(re).test(value), this.expected.matches(description || re));
    }
    rule(rule) {
        return this.exec(rule.result, createError(this.negate, rule.errorKey, rule.errorValue));
    }
    exec(result, failure) {
        return (this.negate ? !result : result) ? StandardErrors.EMPTY : failure;
    }
}
const validate = new Validator();

/** represents state for a value which is validated
 *
 *  useful for user facing components
 */
class State {
    constructor(value, validate) {
        this.value = value;
        this.validate = validate;
    }
    /** if there are changes calls validation and sets errors and invalid properites
     *
     * @param value   value to validate if changed
     * @returns       true if there has been a change and validation was run
     */
    set(value) {
        if (isEqual(this.value, value))
            return false;
        this.value = value;
        this.errors = this.validate(value);
        this.invalid = normalize(this.errors) !== StandardErrors.EMPTY;
        return true;
    }
}

export { StandardErrors, State, Validator, capitalize, createError, createStandardErrors, isDate, isEqual, isNumber, isString, normalize, validate };
//# sourceMappingURL=index.mjs.map
