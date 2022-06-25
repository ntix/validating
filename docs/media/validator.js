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
    /**
     * value should be null
     *
     * @param a value
     * @returns errors
     */
    null(a) {
        return this.exec(a == null, this.expected.null);
    }
    /**
     * value should be a number
     *
     * @param a value
     * @returns errors
     */
    number(a) {
        return this.exec(isNumber(a), this.expected.number);
    }
    /**
     * value should be a string
     *
     * @param a value
     * @returns errors
     */
    string(a) {
        return this.exec(isString(a), this.expected.string);
    }
    /**
     * values should be equal
     *
     * @param a 1st value to compare
     * @param b 2nd value to compare
     * @returns errors
     */
    equal(a, b) {
        return this.exec(isEqual(a, b), this.expected.equal(b));
    }
    /**
     * value should not me more than
     *
     * @param a value
     * @param max maximum number value
     * @returns errors
     */
    maxLength(a, max) {
        return this.exec(a == null || a.length <= max, this.expected.maxLength(max));
    }
    /**
     * value should not be less than
     *
     * @param a value
     * @param min minimum number value
     * @returns errors
     */
    minLength(a, min) {
        return this.exec(a == null || a.length >= min, this.expected.minLength(min));
    }
    /**
     * value should not me more than
     *
     * @param a value
     * @param max maximum value
     * @returns errors
     */
    max(a, max) {
        return this.exec(a <= max, this.expected.max(max));
    }
    /**
     * value should not be less than
     *
     * @param a value
     * @param min minimum value
     * @returns errors
     */
    min(a, min) {
        return this.exec(a >= min, this.expected.min(min));
    }
    /**
     * 1st value includes second
     *
     * @param a iterable value, eg string or array
     * @param b value to find
     * @returns errors
     */
    includes(a, b) {
        return this.exec(a.includes(b), this.expected.includes(b));
    }
    /**
     * value must match regex
     *
     * @param value string value
     * @param re regular expression
     * @param description error description
     * @returns errors
     */
    matches(value, re, description = null) {
        return this.exec(new RegExp(re).test(value), this.expected.matches(description || re));
    }
    /**
     * value must pass the rule
     *
     * @param rule rule
     * @returns errors
     */
    rule(rule) {
        return this.exec(rule.result, createError(this.negate, rule.errorKey, rule.errorValue));
    }
    exec(result, failure) {
        return (this.negate ? !result : result)
            ? StandardErrors.EMPTY
            : failure;
    }
}
