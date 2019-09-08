import { isEqual } from '../predicates';
import { Errors, normalizeErrors } from '../errors';
export class ValidationState {
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
