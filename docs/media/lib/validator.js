import { StandardErrors, createError } from './validation';
import { isEqual, isNumber, isString } from './predicates';
export class Validator {
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
        return this.exec(!a || a.length <= max, this.expected.maxLength(max));
    }
    minLength(a, min) {
        return this.exec(!a || a.length >= min, this.expected.minLength(min));
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
export const validate = new Validator();
//# sourceMappingURL=validator.js.map