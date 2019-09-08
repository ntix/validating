import { Errors } from './errors';
import { isRequired, isEqual } from './predicates';
export class Validator {
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
export const validate = new Validator({}, false);
