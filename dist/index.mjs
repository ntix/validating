const Errors = Object.freeze({
    EMPTY: Object.freeze({}),
    required: 'required',
    null: 'null',
    equal: 'equal',
    minLength: 'min-length',
    maxLength: 'max-length'
});

function normalizeErrors(errors) {
    if (typeof errors !== 'object')
        return errors;
    return Object.keys(errors).reduce((result, key) => {
        const value = normalizeErrors(errors[key]);
        return value === Errors.EMPTY
            ? result
            : Object.assign(Object.assign({}, result), { [key]: value });
    }, Errors.EMPTY);
}

function valueOf(o) {
    return o.valueOf ? o.valueOf() : Object.prototype.valueOf.call(o);
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
    if (typeof a === 'object' || typeof b === 'object') {
        const av = valueOf(a);
        const bv = valueOf(b);
        if (av !== a || bv !== b)
            return isEqual(av, bv);
        return Object.keys(Object.assign(Object.assign({}, a), b)).every(n => isEqual(a[n], b[n]));
    }
    return false;
}

function isRequired(a) {
    return !a;
}

class Validator {
    constructor(errors, negated = false) {
        this.errors = errors;
        this.negated = negated;
    }
    get not() {
        return new Validator(this.errors, true);
    }
    exec(success, errorKey, errorValue = true) {
        if (this.negated)
            success = !success;
        return success
            ? Errors.EMPTY
            : { [`${this.negated ? 'not-' : ''}${errorKey}`]: errorValue };
    }
    required(a) {
        return this.exec(isRequired(a), Errors.required);
    }
    null(a) {
        return this.exec(a == null, Errors.null);
    }
    equal(a, b) {
        return this.exec(isEqual(a, b), Errors.equal);
    }
    minLength(v, min) {
        return this.exec(v.length < min, Errors.minLength);
    }
    maxLength(v, max) {
        return this.exec(v.length > max, Errors.maxLength);
    }
}
const validate = new Validator({}, false);

class ValidationState {
    constructor(value, validate) {
        this.value = value;
        this.validate = validate;
    }
    set(value) {
        if (isEqual(this.value, value))
            return false;
        this.value = value;
        this.errors = this.validate(value);
        this.invalid = normalizeErrors(this.errors) !== Errors.EMPTY;
        return true;
    }
}

export { Errors, ValidationState, Validator, isEqual, isRequired, normalizeErrors, validate, valueOf };
//# sourceMappingURL=index.mjs.map
