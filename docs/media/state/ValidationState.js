import { isEqual } from '../predicates';
import { StandardErrors, normalizeErrors, } from '../validation';
/** represents state for a value which is validated
 *
 *  useful for user facing components
 */
export class ValidationState {
    constructor(
    /** validator function */
    validate, 
    /** value */
    value = null, 
    /** validation errors, will be normalized */
    errors = StandardErrors.EMPTY) {
        this.validate = validate;
        this.value = value;
        /** state is invalid */
        this.invalid = false;
        if (validate == null)
            throw new Error('validate is required');
        this.errors = normalizeErrors(errors);
        this.invalid = this.errors !== StandardErrors.EMPTY;
    }
    /** if there are changes calls validation and sets errors and invalid properites
     *
     * @param value     value to validate if changed
     * @param onChange  a function called when change is made
     * @returns         a new state object if there is change, same if not
     */
    async set(value, onChange) {
        if (isEqual(this.value, value))
            return this;
        const errors = await this.validate(value);
        const newState = new ValidationState(this.validate, value, errors);
        if (onChange)
            onChange(newState);
        return newState;
    }
}
